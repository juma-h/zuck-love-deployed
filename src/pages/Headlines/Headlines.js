import React, { useState, useEffect } from "react";
import { HeadlinesVariant } from "../../components";
import { extractNumbersFromString } from "../../utils/utils";
import { toast } from "react-toastify";
// import "./copy.css";

function Headlines() {
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
  const [isCampaignLoading, setIsCamapaignLoading] = useState(false);
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
    console.log("Selected Ad Name:", option.name);

    setIsAdOpen(false);
  };
  const handleMetricClick = (option) => {
    setSelectedMetric(option.name);
    console.log("Selected metric Name:", option.field_name);

    setIsMetricOpen(false);
  };

  // const handleSelectAdset = (e) => {
  //   const value = e.target.value;
  //   const newValue = extractNumbersFromString(value);
  //   setSelectAdset(newValue);
  // };

  // const handleSelectAd = (e) => {
  //   const value = e.target.value;
  //   const newValue = extractNumbersFromString(value);
  //   console.log("ad value", value);
  //   setSelectedAd(newValue);
  // };

  // const handleSelectMetric = (e) => {
  //   const value = e.target.value;
  //   setSelectedMetric(value);

  //   setIsMetricOpen(false)
  // };

  const handleAdName = (e) => {
    setAdName(e.target.value);
  };

  // fetch functions

  const fetchCampaigns = () => {
    if (token && token !== null && token !== "") {
      setIsCamapaignLoading(true);
      console.log("gett 1");

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
          console.log(result);
          if (status === 200 && result.length > 0) {
            setIsCamapaignLoading(false);
            setCampaignData(result);
            setIsOpen(true);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setIsCamapaignLoading(false);
        });
    }
  };

  const fetchAdsets = () => {
    console.log("clicked");

    if (!selectedCampaignId) {
      toast.warning("Kindly select a campaign first");
      return;
    }

    if (selectedCampaignId && selectedCampaignId !== null) {
      setIsAdsetLoading(true);
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `/abtesting/adsets/?account_id=${account_id}&campaign_id=${selectedCampaignId}`,
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
          if (status === 200 && result.length > 0) {
            setIsAdsetLoading(false);
            setAdsetData(result);
            setIsAdsetOpen(true);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setIsAdsetLoading(false);
        });
    }
  };

  const fetchAds = () => {
    if (!selectedAdsetId) {
      toast.warning("Kindly choose an adset first");
      return;
    }

    if (selectedAdsetId && selectedAdsetId !== null) {
      setIsAdLoading(true);
      let myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        `/abtesting/ads/?account_id=${account_id}&adset_id=${selectedAdsetId}`,
        requestOptions
      )
        .then((response) => {
          const status = response.status;
          return response.json().then((result) => {
            return { status, result };
          });
        })
        .then(({ result, status }) => {
          console.log("ads response", result);
          if (status === 200 && result.length > 0) {
            setIsAdLoading(false);
            const adCreativeId = result[0].ad_creative.id;
            // Set the ad data and ad creative id
            setAdData(result);
            setAdCreativeId(adCreativeId);
            setIsAdOpen(true);
            // console.log("ad id", adCreativeId);
          }
        })
        .catch((error) => {
          console.log("error", error);
          setIsAdLoading(false);
        });
    }
  };

  const fetchMetrics = () => {
    setIsMetricLoading(true);

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
          setIsMetricLoading(false);
          setIsMetricOpen(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setIsMetricLoading(false);
      });
  };

  //get campaigns for user
  // useEffect(() => {
  //   // console.log("gett")
  //   if (token && token !== null && token!== "") {
  //     console.log("gett 1")

  //     let myHeaders = new Headers();
  //     myHeaders.append("Authorization", `Bearer ${token}`);

  //     let requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow",
  //     };

  //     fetch(`/abtesting/campaigns/?account_id=${account_id}`, requestOptions)
  //       .then((response) => {
  //         const status = response.status;
  //         return response.json().then((result) => {
  //           return { status, result };
  //         });
  //       })
  //       .then(({ result, status }) => {
  //         console.log(result);
  //         if (status === 200 && result.length > 0) setCampaignData(result);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }
  // }, [account_id, token]);

  // get adset
  // useEffect(() => {
  //   if (selectedCampaign && selectedCampaign !== null) {
  //     let myHeaders = new Headers();
  //     myHeaders.append("Authorization", `Bearer ${token}`);

  //     let requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow",
  //     };

  //     fetch(
  //       `/abtesting/adsets/?account_id=${account_id}&campaign_id=${selectedCampaign}`,
  //       requestOptions
  //     )
  //       .then((response) => {
  //         const status = response.status;
  //         return response.json().then((result) => {
  //           return { status, result };
  //         });
  //       })
  //       .then(({ result, status }) => {
  //         // console.log(result);
  //         if (status === 200 && result.length > 0) setAdsetData(result);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }
  // }, [selectedCampaign, token, account_id]);

  // get ad
  // useEffect(() => {
  //   if (selectedAdsetId && selectedAdsetId !== null) {
  //     let myHeaders = new Headers();
  //     myHeaders.append("Authorization", `Bearer ${token}`);

  //     let requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow",
  //     };

  //     fetch(
  //       `/abtesting/ads/?account_id=${account_id}&adset_id=${selectedAdsetId}`,
  //       requestOptions
  //     )
  //       .then((response) => {
  //         const status = response.status;
  //         return response.json().then((result) => {
  //           return { status, result };
  //         });
  //       })
  //       .then(({ result, status }) => {
  //         console.log("ads response", result);
  //         if (status === 200 && result.length > 0) {
  //           const adCreativeId = result[0].ad_creative.id;
  //           // Set the ad data and ad creative id

  //           setAdData(result);
  //           setAdCreativeId(adCreativeId);
  //           // console.log("ad id", adCreativeId);
  //         }
  //       })
  //       .catch((error) => console.log("error", error));
  //   }
  // }, [selectedAdset, token, account_id]);

  //get metrics
  // useEffect(() => {
  //   let myHeaders = new Headers();
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   let requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch("/abtesting/metrics/", requestOptions)
  //     .then((response) => {
  //       const status = response.status;
  //       return response.json().then((result) => {
  //         return { status, result };
  //       });
  //     })
  //     .then(({ result, status }) => {
  //       // console.log(result);
  //       if (status === 200 && result.length > 0) {
  //         console.log("metrics::", result);
  //         setMetricData(result);
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // }, [token]);

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

      fetch("/abtesting/new-ad-headline/", requestOptions)
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
  const launchTestFunction = (e) => {
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

    e.preventDefault();

    setIsClicked(true);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    let raw = JSON.stringify({
      ad_creative_id: adcreativeId,
      ad_name: adName,
      new_ads_headline: tabContents[activeTab],
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
        setIsClicked(false);
        console.error("error", error);
        toast.error("An error occurred while processing the request.");
      });
  };

  return (
    <>
      <HeadlinesVariant
        isOpen={isOpen}
        isCampaignLoading={isCampaignLoading}
        handleOptionClick={handleCampignOptionClick}
        toggleDropdown={fetchCampaigns}
        campaignOptions={campaignData}
        selectedCampaign={selectedCampaign}
        isAdsetLoading={isAdsetLoading}
        toggleAdsetDropdown={fetchAdsets}
        selectedAdset={selectedAdset}
        adsetOptions={adsetData}
        handleAdsetOptions={handleAdsetClick}
        isAdsetOpen={isAdsetOpen}
        isAdLoading={isAdLoading}
        isAdOpen={isAdOpen}
        toggleAdDropdown={fetchAds}
        handleAdOptions={handleAdClick}
        adOptions={adData}
        selectedAd={selectedAd}
        // campaignOptions={
        //   campaignData && campaignData.length > 0 ? (
        //     campaignData.map((campaign) => (
        //       <>
        //         <option
        //           key={campaign.id}
        //           value={campaign.name + " - " + campaign.id}
        //         >
        //           {campaign.name}
        //         </option>
        //       </>
        //     ))
        //   ) : (
        //     <option value="">No campaign data available</option>
        //   )
        // }
        // selectedCampaign={selectedCampaign}
        // campaignFn={handleSelectCampaign}
        // adsetOptions={
        //   adsetData && adsetData.length > 0 ? (
        //     adsetData.map((adset) => (
        //       <>
        //         <option key={adset.id} value={adset.name + " - " + adset.id}>
        //           {adset.name}
        //         </option>
        //       </>
        //     ))
        //   ) : (
        //     <option value="">No adset data available</option>
        //   )
        // }
        // selectedAdset={selectedAdset}
        // adsetFn={handleSelectAdset}
        // adFn={handleSelectAd}

        isMetricOpen={isMetricOpen}
        toggleMetricDropwDown={fetchMetrics}
        isMetricLoading={isMetricLoading}
        handleMetricOptions={handleMetricClick}
        metricOptions={metricData}
        selectedMetric={selectedMetric}
        // metricFn={handleSelectMetric}
        // metricOptions={
        //   metricData && metricData.length > 0 ? (
        //     metricData.map((metric) => (
        //       <>
        //         <option key={metric.id} value={metric.field_name}>
        //           {metric.name}
        //         </option>
        //       </>
        //     ))
        //   ) : (
        //     <option value="">No metric data available</option>
        //   )
        // }
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
        fetchId={adcreativeId}
        launchTestFn={launchTestFunction}
      />
    </>
  );
}

export default Headlines;
