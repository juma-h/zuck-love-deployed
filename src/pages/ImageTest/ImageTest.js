import React, { useState, useEffect, useCallback, useRef } from "react";
import { ImageVariant } from "../../components";
import { fetchCampaigns, fetchMetrics , fetchAdsets, fetchAds, fetchImagine} from "../api";
import { toast } from "react-toastify";


// import "./copy.css";

function ImageTest() {
  //encrypt local storage items
  const account_id = localStorage.getItem("account_id");
  const token = localStorage.getItem("bearer_token");

  // useStates
  const [progress, setProgress] = useState("");

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
  const [isOpen, setIsOpen] = useState(false);
  const [isAdsetOpen, setIsAdsetOpen] = useState(false);
  const [isAdOpen, setIsAdOpen] = useState(false);
  const [isMetricOpen, setIsMetricOpen] = useState(false);

  const [isAdsetLoading, setIsAdsetLoading] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [isCampaignLoading, setIsCampaignLoading] = useState(false);
  const [isMetricLoading, setIsMetricLoading] = useState(false);

  const [adcreativeId, setAdCreativeId] = useState("");
  const [activeTab, setActiveTab] = useState();
  const [adName, setAdName] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [adBody, setAdBody] = useState("");

  const imageIdRef = useRef(null);

  const [imageId, setImageId] = useState("");
  const [fnClicked, setFnClicked] = useState(false);
  const [index, setIndex] = useState();
  const [retryCount, setRetryCount] = useState(0);
  const [spinMsg, setSpinMsg] = useState("");
  // const [buttonState, setButtonState] = useState(false);
  const [urlVariationPairs, setUrlVariationPairs] = useState([]);

  const tabs = ["Variation 1", "Variation 2", "Variation 3", "Variation 4"];

  const [tabContents, setTabContents] = useState(
    tabs.map((tab) => ({
      title: tab,
      content: "",
    }))
  );

// const imageUrls = [
//   "https://cdn.pixabay.com/photo/2015/03/10/17/23/youtube-667451_1280.png",
//   "https://sitechecker.pro/wp-content/uploads/2023/05/URL-meaning.jpg",
//   "https://s3.amazonaws.com/images.seroundtable.com/google-submit-url-1516800645.jpg",
//   // Add the fourth image URL here
// ];

// const [tabContents, setTabContents] = useState(
//   tabs.map((tab, index) => ({
//     title: tab,
//     content: imageUrls[index] || "", // Use the corresponding image URL or an empty string if not available
//   }))
// );


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
    fetchAds( token, selectedAdsetId,account_id,setIsAdLoading,setAdData,setAdCreativeId,setIsAdOpen,toast, setAdBody)
  }

  const handleFetchMetrics = ()=>{
    fetchMetrics(token,setIsMetricLoading,setMetricData,setIsMetricOpen)
  }


  const buttonState = selectedCampaignId && selectedAdsetId && selectedAdId && selectedMetric;

  // imagine  api 
  useEffect(() => {
    if (buttonState && adBody) {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);
  
      const raw = JSON.stringify({
        ad_copy: adBody,
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      // Show the initial "Fetching Image Id" toast
      let toastId = toast.info("Fetching images, please wait 😊", {
        autoClose: false,
      });
  
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
          
  
            // Update the toast with the "Image Id found" message and color
            toast.update(toastId, {
              type: toast.TYPE.SUCCESS,
              render: "Your images are ready🤗, click below to generate",
              autoClose: 5000,
            });
          } else {
            throw new Error("Invalid response format");
          }
        })
        .catch((error) => {
          console.log("error", error);
  
          // Update the toast with the "Error fetching image id" message and color
          toast.update(toastId, {
            type: toast.TYPE.ERROR,
            render: "Error fetching images 😐",
            autoClose: 5000,
          });
        });
    }
  }, [token, buttonState, adBody]);

  const clearFields = () => {
    setSelectedCampaign("");
    setSelectAdset("");
    setSelectedAd("");
    setSelectedMetric("");
    setAdName("");
  };

  //fetchImages variant
  const getVariationsWithRetry = useCallback(
    (index) => {
      // console.log("clicked");

      if (
        imageIdRef &&
        imageIdRef !== null &&
        imageIdRef !== undefined
        // &&
        // dataCache[index] === null
      ) {
        console.log("imageId", imageIdRef.current);

        setIsLoading(true);
        // setRetryCount(1);

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
              if (
                (status === 200 && result.data.status === "pending") ||
                result.data.status === "in-progress"
              ) {
                setProgress(result.data.progress);

                // Continue checking status after a delay (5 seconds)
                setTimeout(fetchImageAndCheckStatus, 5000);
              } else if (
                status === 200 &&
                result.data.status === "completed" &&
                result.data.upscaledUrls !== null
              ) {
                //if status is success

                //help needed here lmao

                console.log("image result", result);

                console.log("upscaled::", result.data.upscaled_urls);

                //  Extract upscaled URLs from the result
                const upscaledUrls = result.data.upscaled_urls || [];
                const newTabContents = [...tabContents];
                // console.log("start tab contents", newTabContents);

                const updatedTabContents = tabContents.map((tab, index) => ({
                  ...tab,
                  content: upscaledUrls[index] || tab.content,
                }));
                setTabContents(updatedTabContents);
                console.log("end ", tabContents);
                setDataCache(updatedTabContents);

                setIsLoading(false);
              }else if(   status === 200 &&
                result.data.status === "failed"){
                  setIsLoading(false)
                  toast.error("Error generating images , try again")

              }
            })
            .catch((error) => {
              console.log("error", error);
            });
        };
        // Start checking status initially
        fetchImageAndCheckStatus();
      } else {
        // Data is already cached, use it
        setActiveTab(index);
      }
    },
    [imageIdRef.current, tabContents, token]
  );

  useEffect(() => {
    if (
      tabContents &&
      tabContents[index] &&
      tabContents[index].content !== null
    ) {
      toast.info(
        "Images fetched successfully! Click the button again to load them!"
      );
    }
  }, [tabContents, index]);

  const fetchImageVariations = (index) => {
    if (!imageIdRef.current) {
      toast.error("Image id is null");
      return;
    } else {
      console.log("fetch images");
      getVariationsWithRetry(index);
    }
  };
  
  const handleTabClick = (index) => {
    setIsLoading(false);
    setActiveTab(index);
    const newTabContents = [...tabContents];
    setTabContents(newTabContents);
  };

  // Launch New Test Fn
  const launchTestFunction = (e) => {
    e.preventDefault();

    if (!adcreativeId) {
      toast.warning("Please provide the ad creative id");
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
      new_ads_image_url: tabContents[activeTab].content,
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
          setIsLoading(false)
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
      <ImageVariant
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
        tabContents={tabContents || ""}
        isLoading={isLoading}
        adName={adName}
        adNameFn={handleAdName}
        index={index}
        isClicked={isClicked}
        launchTestFn={launchTestFunction}
        now={progress}
        fetchId={imageIdRef.current}
        buttonState={buttonState}
        fetchImageVariations={fetchImageVariations}
      />
    </>
  );
}

export default ImageTest;
