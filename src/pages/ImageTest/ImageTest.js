import React, { useState, useEffect, useCallback, useRef } from "react";
import { ImageVariant } from "../../components";
import { extractNumbersFromString } from "../../utils/utils";
import { toast } from "react-toastify";
import { tab } from "@testing-library/user-event/dist/tab";
import Spinner from "../../components/Spinner/Spinner";
import ProgressBar from 'react-bootstrap/ProgressBar';


// import "./copy.css";

function ImageTest() {
  //encrypt local storage items
  const account_id = sessionStorage.getItem("account_id");
  const token = sessionStorage.getItem("bearer_token");

  // useStates
  const [campaignData, setCampaignData] = useState([]);
  const [progress, setProgress]= useState("")
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
  const [adBody, setAdBody] = useState("");
  const [imageId, setImageId] = useState("");
  const [fnClicked, setFnClicked] = useState(false);
  const [index, setIndex] = useState();
  const [retryCount, setRetryCount] = useState(0); // State to track the retry count
  const [spinMsg, setSpinMsg] = useState("");

  const tabs = ["Variation 1", "Variation 2", "Variation 3", "Variation 4"];
  const [tabContents, setTabContents] = useState(
    tabs.map((tab) => ({
      title: tab,
      content: [],
    }))
  );

  //  const [tabContents, setTabContents]= useState([])
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
    if (token && token !== null && token !== "") {
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
      console.log("Adset", selectedAdset);
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
          console.log("get ad response", result);
          if (status === 200 && result.length > 0) {
            const adCreativeId = result[0].ad_creative.id;
            // Set the ad data and ad creative id
            setAdData(result);
            setAdBody(result[0].ad_creative.ad_creative_json.body);
            setAdCreativeId(adCreativeId);
            // console.log("bodyyyyy");
            // console.log("ad id", result[0].ad_creative.ad_creative_json.body);
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
          // console.log("metrics::", result);
          setMetricData(result);
        }
      })
      .catch((error) => console.log("error", error));
  }, [token]);

  const imageIdRef = useRef(null);

  useEffect(() => {
    if (selectedAd && selectedAd !== null && adBody && adBody !== null && !imageIdRef.current) {
      // alert("fetching");
      toast.info("Fetching Image Id, please wait ");

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      var raw = JSON.stringify({
        ad_copy: adBody,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("/abtesting/imagine/", requestOptions)
        .then((response) => {
          const status = response.status;
          if (status === 200) {
            return response.json();
          } else {
            throw new Error(`Request failed with status ${status}`);
          }
        })
        .then((result) => {
          console.log("image result", result);
          if (result.data && result.data.id) {
            imageIdRef.current = result.data.id; // Set imageId using the ref
            toast.success("Image Id ready, click to fetch variations");

            console.log("abtest result::", result.data.id);
          } else {
            throw new Error("Invalid response format");
          }
        })
        .catch((error) => {
          console.log("error", error);
          // Handle the error, e.g., show an error toast or message
          toast.error("Error fetching image id");
        });
    }
  }, [token, adBody, selectedAd]);

  
  
  const clearFields = () => {
    setSelectedCampaign("");
    setSelectAdset("");
    setSelectedAd("");
    setSelectedMetric("");
    setAdName("");
  };

  const getVariationsWithRetry = useCallback(
    (index) => {
      console.log("clicked");
      if (
        imageIdRef &&
        imageIdRef !== null &&
        imageIdRef !== undefined
        // &&
        // dataCache[index] === null
      ) {
        console.log("imageId", imageIdRef);
  
        // setFnClicked(true);
        setIsLoading(true);
        // setRetryCount(1);
        setRetryCount((prevRetryCount) => prevRetryCount + 1);
  
        // Function to fetch image and check status
        const fetchImageAndCheckStatus = () => {
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", `Bearer ${token}`);
  
          var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
  
          console.log("where does it stop");
  
          fetch(`/abtesting/upscale/${imageIdRef.current}`, requestOptions)
            .then((response) => {
              const status = response.status;
              return response.json().then((result) => {
                return { status, result };
              });
            })
            .then(({ result, status }) => {
              console.log("uscale", result);
              if (status === 200 && result.data.status === "pending" ||result.data.status === "in-progress") {
                setProgress(result.data.progress);
  
                // Continue checking status after a delay (5 seconds)
                setTimeout(fetchImageAndCheckStatus, 5000);
              } else if (status === 200 && result.data.status === "completed" && result.data.upscaledUrls !== null ) {


                setIsLoading(false);
                console.log("image result", result);
  
                console.log("upscaled::", result.data.upscaled_urls);

                // // Extract upscaled URLs from the result
                const upscaledUrls = result.data.upscaled_urls || [];
  
                 const newTabContents = [...tabContents];
                // newTabContents[index] = upscaledUrls[index];
                // setDataCache(newTabContents);
  
                // // Update the content for the active tab
                // setTabContents(newTabContents);
                for (let i= 0 ; i < tabs.length ; i++){
                  upscaledUrls[index]= newTabContents.content[index];
                  console.log(newTabContents)
                }
                setTabContents(newTabContents)
                
                // // Update the state
                 console.log("TABS",tabContents); 
              }
            })
            .catch((error) => {
              console.log("error", error);
              // Retry the request after a delay (3 seconds)
            });
        };
  
        // Start checking status initially
        fetchImageAndCheckStatus();
      } else {
        // Data is already cached, use it
        setActiveTab(index);
      }
    },
    [imageId, tabContents, token]
  );
  



  const handleTabClick = (index) => {
    if (
      tabContents[index]?.content?.length === 0 ||
      tabContents[index]?.content === null
      // tabContents.length === 0
    ) {
      // Fetch data if content is empty
      console.log("its empty ");
      getVariationsWithRetry(index);
    } else {
      console.log("its not empty , so we are here");
      // Append data to the existing tabContents
      const newTabContents = [...tabContents];
      //  setNewTabContent(newTabContents)
    }
  };

  // Launch New Test Fn
  const launchTestFunction = (e) => {
    e.preventDefault();

    setIsClicked(true);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    let raw = JSON.stringify({
      ad_creative_id: adcreativeId,
      ad_name: adName,
      new_ads_image_url: tabContents[activeTab],
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
        console.error("error", error);
        toast.error("An error occurred while processing the request.");
      });
  };

  return (
    <>
      {/* {spinMsg && spinMsg !== "" ? (
        <Spinner msg={spinMsg} />
      ) : ( */}
      <ImageVariant
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
        selectedCampaign={selectedCampaign}
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
        selectedAdset={selectedAdset}
        adsetFn={handleSelectAdset}
        adOptions={adData &&
          adData.length > 0 &&
          adData.map((ad) => (
            <option key={ad.id} value={ad.id}>
              {ad.name}
            </option>
          ))}
        selectedAd={selectedAd}
        adFn={handleSelectAd}
        selectedMetric={selectedMetric}
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
        index={index}
        isClicked={isClicked}
        launchTestFn={launchTestFunction}
        now={progress}
        fetchId={imageIdRef}
      />
      {/* )} */}
    </>
  );
}

export default ImageTest;
