import React, { useState, useEffect } from "react";
import { VariantDiv, NavTabs } from "../../components";
import { extractNumbersFromString } from "../../utils/utils";
import { toast } from "react-toastify";
import "./copy.css";

function Copy() {
  //encrypt local storage items
  const account_id = localStorage.getItem("account_id");
  const token = localStorage.getItem("bearer_token");

  // useStates
  const [campaignData, setCampaignData] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedAdset, setSelectAdset] = useState("");
  const [adsetData, setAdsetData] = useState([]);
  const [selectedAd, setSelectedAd] = useState("");
  const [adData, setAdData] = useState([]);
  const [metricData, setMetricData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [adcreativeId, setAdCreativeId] = useState("");
  const [activeTab, setActiveTab] = useState();
  const [adName, setAdName] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const tabs = ["Variation 1", "Variation 2", "Variation 3", "Variation 4"];
  const [tabContents, setTabContents] = useState(
    tabs.map((tab) => ({ title: tab, content: "" }))
  );

  // Cache to store fetched data for each tab
  const [dataCache, setDataCache] = useState(Array(tabs.length).fill(null));

  // onchange functions
  const handleSelectCampaign = (e) => {
    const newValue = extractNumbersFromString(e.target.value);
    setSelectedCampaign(newValue);
  };

  const handleSelectAdset = (e) => {
    const value = e.target.value;
    const newValue = extractNumbersFromString(value);
    setSelectAdset(newValue);

  };

  const handleSelectAd = (e) => {
    const value = e.target.value;
    const newValue = extractNumbersFromString(value);
    setSelectedAd(newValue);
  };

  const handleSelectMetric = (e) => {
    const value = e.target.value;
    setSelectedMetric(value);
  };

  const handleAdName = (e) => {
    setAdName(e.target.value);
  };



  //get campaigns for user
  useEffect(() => {
    if (token && token !== null && token!== "") {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`/abtesting/campaigns/?account_id=${account_id}`, requestOptions)
        .then((response) => {
          const status = response.status;
          return response.json().then((result) => {
            return { status, result };
          });
        })
        .then(({ result, status }) => {
          // console.log(result);
          if (status === 200 && result.length > 0) setCampaignData(result);
        })
        .catch((error) => console.log("error", error));
    }
  }, [account_id, token]);

  // get adset
  useEffect(() => {

    if (selectedCampaign && selectedCampaign !== null) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `/abtesting/adsets/?account_id=${account_id}&campaign_id=${selectedCampaign}`,
        requestOptions
      )
        .then((response) => {
          const status = response.status;
          return response.json().then((result) => {
            return { status, result };
          });
        })
        .then(({ result, status }) => {
          // console.log(result);
          if (status === 200 && result.length > 0) setAdsetData(result);
        })
        .catch((error) => console.log("error", error));
    }
  }, [selectedCampaign, token, account_id]);

  // get ad
  useEffect(() => {
    if (selectedAdset && selectedAdset !== null) {
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `/abtesting/ads/?account_id=${account_id}&adset_id=${selectedAdset}`,
        requestOptions
      )
        .then((response) => {
          const status = response.status;
          return response.json().then((result) => {
            return { status, result };
          });
        })
        .then(({ result, status }) => {
          // console.log("get ad response", result);
          if (status === 200 && result.length > 0) {
            const adCreativeId = result[0].ad_creative.id;
            // Set the ad data and ad creative id
            setAdData(result);
            setAdCreativeId(adCreativeId);
            console.log("ad id", adCreativeId);
          }
        })
        .catch((error) => console.log("error", error));
    }
  }, [selectedAdset, token, account_id]);

  //get metrics
  useEffect(() => {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("/abtesting/metrics/", requestOptions)
      .then((response) => {
        const status = response.status;
        return response.json().then((result) => {
          return { status, result };
        });
      })
      .then(({ result, status }) => {
        // console.log(result);
        if (status === 200 && result.length > 0) {
          console.log("metrics::", result);
          setMetricData(result);
        }
      })
      .catch((error) => console.log("error", error));
  }, [token]);

  const clearFields = () => {
    setSelectedCampaign(""); // Clear selected campaign
    setSelectAdset(""); // Clear selected adset
    setSelectedAd(""); // Clear selected ad
    setSelectedMetric(""); // Clear selected metric
    setAdName(""); // Clear adName
  };
  

  //get variations
  const getVariations = (index) => {
    if (dataCache[index] === null) {
      // Data is not cached, fetch it
      setIsLoading(true);
      setActiveTab(index);

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
      };

      fetch("/abtesting/new-ad-content/", requestOptions)
        .then((response) => {
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
        .catch((error) => console.log("error", error));
    } else {
      // Data is already cached, use it
      setActiveTab(index);
    }
  };

  const handleTabClick = (index) => {
    getVariations(index);
  };

  // Launch New Test Fn
  // const launchTestFunction = (e) => {
  //   e.preventDefault();

  //   setIsClicked(true);

  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   let raw = JSON.stringify({
  //     ad_creative_id: adcreativeId,
  //     ad_name: adName,
  //     new_ads_content: tabContents[activeTab],
  //     metric_to_optimize: selectedMetric,
  //   });

  //   let requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   console.log("post body::", raw);

  //   fetch(`/abtesting/ad-ab-test/?account_id=${account_id}`, requestOptions)
  //     .then((response) => {
  //       const status = response.status;
  //       if (response.ok) {
  //         return { status };
  //       } else {
  //         throw new Error(`Request failed with status: ${status}`);
  //       }
  //     })
  //     .then(({ status }) => {
  //       setIsClicked(false);
  //       if (status === 200) {
  //         toast.success("Test Created successfully");
  //         clearFields(); //clear fields on success
  //       } else {
  //         toast.warning(`Request failed with status: ${status}`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("error", error);
  //       toast.error("An error occurred while processing the request.");
  //     });
  // };

  const launchTestFunction =()=>{
    alert("clearing fields ")
    clearFields();
  }

  return (
    <>
      <VariantDiv

        campaignOptions={
          campaignData &&
          campaignData.length > 0 &&
          campaignData.map((campaign) => (
            <>
              <option
                key={campaign.id}
                value={campaign.name + " - " + campaign.id}
              >
                {campaign.name}
              </option>
            </>
          ))
        }
        // selectedCampaign={selectedCampaign}
        campaignFn={handleSelectCampaign}
        adsetOptions={
          adsetData &&
          adsetData.length > 0 &&
          adsetData.map((adset) => (
            <>
              <option key={adset.id} value={adset.name + " - " + adset.id}>
                {adset.name}
              </option>
            </>
          ))
        }
        //  selectedAdset={selectedAdset}
        adsetFn={handleSelectAdset}
        adOptions={
          adData &&
          adData.length > 0 &&
          adData.map((ad) => (
            <>
              <option key={ad.id} value={ad.name + " - " + ad.id}>
                {ad.name}
              </option>
            </>
          ))
        }
        // selectedAd={selectedAd}
        adFn={handleSelectAd}
        // selectedMetric={selectedMetric}
        metricFn={handleSelectMetric}
        metricOptions={
          metricData &&
          metricData.length > 0 &&
          metricData.map((metric) => (
            <>
              <option key={metric.id} value={metric.field_name}>
                {metric.name}
              </option>
            </>
          ))
        }
        tabs={tabs}
        // tabContents={tabContents}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabContents={tabContents[activeTab] || ""}
        isLoading={isLoading}
        adName={adName}
        adNameFn={handleAdName}
        isClicked={isClicked}
        launchTestFn={launchTestFunction}
      />
    </>
  );
}

export default Copy;
