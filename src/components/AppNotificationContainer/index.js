import React, {useEffect} from "react";
import CircularProgress from "../CircularProgress";
import {message as toastNotification} from "antd";

const AppNotificationContainer = ({loading, error, message}) => {
  useEffect(() => {
      error && toastNotification.error(<span id="message-id">{error}</span>)
      message && toastNotification.success(<span id="message-id">{message}</span>)
      }, [error,message]);
  return (
    <>
      {loading && <div className="gx-loader-view gx-loader-position">
        <CircularProgress/>
      </div>}
    </>
  )
}

export default AppNotificationContainer;
