import React, { useState, useEffect } from "react";
import { VariantDiv, NavTabs } from "../../components";
import { extractNumbersFromString } from "../../utils/utils";
import "./copy.css";

function Copy() {
  const account_id = "896631874812550";
  const token = localStorage.getItem("bearer_token");
  const [campaignData, setCampaignData] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedAdset, setSelectAdset] = useState("");
  const [adsetData, setAdsetData] = useState([]);
  const [selectedAd, setSelectedAd] = useState("");
  const [adData, setAdData] = useState([]);
  const [metricData, setMetricData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("");

  const [adcreativeId, setAdCreativeId] = useState("");
   const [tabContents, setTabContents] = useState("");


  const [activeTab, setActiveTab] = useState();



  const tabs = ["Variation 1", "Variation 2", "Variation 3", "Variation 4"];

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
    const newValue = extractNumbersFromString(value);
    setSelectedMetric(newValue);
  };

  //get campaigns for user
  useEffect(() => {
    if (token && token !== null) {
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
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
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
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
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
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
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
        console.log(result);
        if (status === 200 && result.length > 0) setMetricData(result);
      })
      .catch((error) => console.log("error", error));
  }, [token]);

  //get variations
  const getVariations = (index) => {

    setTabContents("")
    console.log("variation index", index)
    // setActiveTab(index);
    setActiveTab(index); 


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer tGxGlTKlplrV2d08zVqs8Ab2Fl88xi");

    var raw = JSON.stringify({
      ad_creative_id: adcreativeId,
    });

    var requestOptions = {
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
      .then(({result, status}) => {
        console.log(result)
        if(status === 200 && result !== null){
           setTabContents(result)
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleTabClick = (index) => {
    getVariations(index); 
  };
  

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
        adFn={handleSelectAd}
        metricFn={handleSelectMetric}
        metricOptions={
          metricData &&
          metricData.length > 0 &&
          metricData.map((metric) => (
            <>
              <option key={metric.id} value={metric.name + " - " + metric.id}>
                {metric.name}
              </option>
            </>
          ))
        }
        tabs={tabs}
        tabContents={tabContents}
        handleTabClick={handleTabClick}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </>
  );
}

export default Copy;
