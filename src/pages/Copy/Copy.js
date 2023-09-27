import React, { useState } from "react";
import { VariantDiv } from "../../components";
import { extractNumbersFromString } from "../../utils/utils";
import { fetchCampaigns, fetchMetrics , fetchAdsets, fetchAds} from "../api";
import { toast } from "react-toastify";
import "./copy.css";

function Copy() {
  //encrypt local storage items
  const account_id = localStorage.getItem("account_id");
  const token = localStorage.getItem("bearer_token");

  // useStates
  const [campaignData, setCampaignData] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedCampaignId, setSelectedCampaignId] = useState("");

  const [selectedAdset, setSelectAdset] = useState("");
  const [adsetData, setAdsetData] = useState([]);
  const [selectedAdsetId, setSelectAdsetId] = useState();

  const [selectedAd, setSelectedAd] = useState("");
  const [adData, setAdData] = useState([]);
  const [selectedAdId, setSelectedAdId] = useState();

  const [metricData, setMetricData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isAdsetLoading, setIsAdsetLoading] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [isCampaignLoading, setIsCampaignLoading] = useState(false);
  const [isMetricLoading, setIsMetricLoading] = useState(false);

  const [adcreativeId, setAdCreativeId] = useState("");
  const [activeTab, setActiveTab] = useState();
  const [adName, setAdName] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isAdsetOpen, setIsAdsetOpen] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [isMetricOpen, setIsMetricOpen] = useState(false);

  const tabs = ["Variation 1", "Variation 2", "Variation 3", "Variation 4"];
  const [tabContents, setTabContents] = useState(
    tabs.map((tab) => ({ title: tab, content: "" }))
  );
  // Cache to store fetched data for each tab
  const [dataCache, setDataCache] = useState(Array(tabs.length).fill(null));

  // onchange functions

  const handleCampignOptionClick = (option) => {
    setSelectedCampaign(option.name);
    setSelectedCampaignId(option.id);
    // console.log("Selected ID:", option.id);
    // console.log("Selected Name:", option.name);

    setIsOpen(false);
  };

  const handleAdsetClick = (option) => {
    setSelectAdset(option.name);
    setSelectAdsetId(option.id);
    // console.log("Selected ID:", option.id);
    // console.log("Selected Adset Name:", option.name);

    setIsAdsetOpen(false);
  };

  const handleAdClick = (option) => {
    setSelectedAd(option.name);
    setSelectedAdId(option.id);
    // console.log("Selected ID:", option.id);
    // console.log("Selected Ad Name:", option.name);

    setIsAdOpen(false);
  };


  const handleMetricClick = (option) => {
    setSelectedMetric(option.name);
    // console.log("Selected metric Name:", option.field_name);

    setIsMetricOpen(false);
  };

  const handleAdName = (e) => {
    setAdName(e.target.value);
  };

  // fetch functions

  const handleFetchCampaigns = () => {
    fetchCampaigns(token, account_id, setIsCampaignLoading, setCampaignData, setIsOpen);
  };

  const handleFetchAdsets = ()=>{
    fetchAdsets(token,selectedCampaignId,account_id,setIsAdsetLoading, setAdsetData,setIsAdsetOpen,toast)

  }

  const handleFetchAds  = ()=>{
    fetchAds( token, selectedAdsetId,account_id,setIsAdLoading,setAdData,setAdCreativeId,setIsAdOpen,toast)

  }

  const handleFetchMetrics = ()=>{
    fetchMetrics(token,setIsMetricLoading,setMetricData,setIsMetricOpen)
  }

  const clearFields = () => {
    setSelectedCampaign("");
    setSelectAdset("");
    setSelectedAd("");
    setSelectedMetric("");
    setAdName("");
  };

  //get variations
  const getVariations = (index) => {
    if (!adcreativeId) {
      toast.error("No ad creative id");
      return;
    }
    if (dataCache[index] === null) {
      // Data is not cached, fetch it
      setIsLoading(true);
      setActiveTab(index);

      const controller = new AbortController();
      const signal = controller.signal;

      // Set a 30-second timeout
      const timeoutId = setTimeout(() => {
        controller.abort();
        setIsLoading(false);
        console.log("Request timed out");
        toast.error("Request timed out , try again");
      }, 30000);

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      let raw = JSON.stringify({
        ad_creative_id: adcreativeId,
      });

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        signal,
      };

      fetch("/abtesting/new-ad-content/", requestOptions)
        .then((response) => {
          clearTimeout(timeoutId);
          const status = response.status;
          return response.json().then((result) => {
            return { status, result };
          });
        })
        .then(({ result, status }) => {
          setIsLoading(false);
          if (status === 200 && result !== null) {
            // Update the cache with the fetched data
            const newDataCache = [...dataCache];
            newDataCache[index] = result;
            setDataCache(newDataCache);

            // Update the content for the active tab
            const newTabContents = [...tabContents];
            newTabContents[index] = result;
            setTabContents(newTabContents);
          }
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Request was aborted due to timeout");
          } else {
            console.log("Error:", error);
          }
        });
    } else {
      // Data is already cached, use it
      setActiveTab(index);
    }
  };

  const handleTabClick = (index) => {
    getVariations(index);
  };

  // Launch New Test Fn
  const launchTestFunction = (e) => {
    e.preventDefault();

    if (!adcreativeId) {
      toast.warning("Please provide the ad creative ID");
      return;
    }

    if (!adName) {
      toast.warning("Please provide the ad name");
      return;
    }

    if (!tabContents[activeTab]) {
      toast.warning("Please fetch variations by clicking the button");
      return;
    }

    if (!selectedMetric) {
      toast.warning("Please select a metric to optimize");
      return;
    }

    setIsClicked(true);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    let raw = JSON.stringify({
      ad_creative_id: adcreativeId,
      ad_name: adName,
      new_ads_content: tabContents[activeTab],
      metric_to_optimize: selectedMetric,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    console.log("post body::", raw);

    fetch(`/abtesting/ad-ab-test/?account_id=${account_id}`, requestOptions)
      .then((response) => {
        const status = response.status;
        if (response.ok) {
          return { status };
        } else {
          throw new Error(`Request failed with status: ${status}`);
        }
      })
      .then(({ status }) => {
        setIsClicked(false);
        if (status === 200) {
          toast.success("Test Created successfully");
          clearFields(); //clear fields on success
        } else {
          toast.warning(`Request failed with status: ${status}`);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("error", error);
        toast.error("An error occurred while processing the request.");
      });
  };


  return (
    <>
      <VariantDiv
        isOpen={isOpen}
        isCampaignLoading={isCampaignLoading}
        handleOptionClick={handleCampignOptionClick}
        toggleDropdown={handleFetchCampaigns}
        campaignOptions={campaignData}
        selectedCampaign={selectedCampaign}
        isAdsetLoading={isAdsetLoading}
        toggleAdsetDropdown={handleFetchAdsets}
        selectedAdset={selectedAdset}
        adsetOptions={adsetData}
        handleAdsetOptions={handleAdsetClick}
        isAdsetOpen={isAdsetOpen}
        isAdLoading={isAdLoading}
        isAdOpen={isAdOpen}
        toggleAdDropdown={handleFetchAds}
        handleAdOptions={handleAdClick}
        adOptions={adData}
        selectedAd={selectedAd}
        isMetricOpen={isMetricOpen}
        toggleMetricDropwDown={handleFetchMetrics}
        isMetricLoading={isMetricLoading}
        handleMetricOptions={handleMetricClick}
        metricOptions={metricData}
        selectedMetric={selectedMetric}
        tabs={tabs}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabContents={tabContents[activeTab] || ""}
        isLoading={isLoading}
        adName={adName}
        adNameFn={handleAdName}
        fetchId={adcreativeId}
        isClicked={isClicked}
        launchTestFn={launchTestFunction}
      />
    </>
  );
}

export default Copy;
