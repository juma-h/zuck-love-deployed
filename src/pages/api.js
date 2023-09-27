// fetch apis

export const fetchCampaigns = (
  token,
  account_id,
  setIsCampaignLoading,
  setCampaignData,
  setIsOpen
) => {
  // Your fetchCampaigns code here
  if (token && token !== null && token !== "") {
    setIsCampaignLoading(true);
    console.log("get api from api js, clicked ");

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
          setIsCampaignLoading(false);
          setCampaignData(result);
          setIsOpen(true);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setIsCampaignLoading(false);
      });
  }
};

export const fetchAdsets = (
  token,
  selectedCampaignId,
  account_id,
  setIsAdsetLoading,
  setAdsetData,
  setIsAdsetOpen,
  toast
) => {
  // Your fetchAdsets code here

  console.log("from api js");
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

export const fetchAds = (
  token,
  selectedAdsetId,
  account_id,
  setIsAdLoading,
  setAdData,
  setAdCreativeId,
  setIsAdOpen,
  toast,
  setAdBody
) => {
  console.log("from ads api js");
  // Your fetchAds code here
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

          //  ----- adbofy for imageTest
          setAdBody(result[0].ad_creative.ad_creative_json.body);
        }
      })
      .catch((error) => {
        console.log("error", error);
        setIsAdLoading(false);
      });
  }
};

export const fetchMetrics = (
  token,
  setIsMetricLoading,
  setMetricData,
  setIsMetricOpen
) => {
  // Your fetchMetrics code here

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


// ---- unusable ----
export const fetchImagine = (token, buttonState, adBody, imageIdRef, toast) => {
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
};
