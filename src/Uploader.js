import React, { Component } from "react";

const Uppy = require("@uppy/core");
const Dashboard = require("@uppy/dashboard");
const GoogleDrive = require("@uppy/google-drive");
const Dropbox = require("@uppy/dropbox");
const OneDrive = require("@uppy/onedrive");
require("@uppy/core/dist/style.css");
require("@uppy/dashboard/dist/style.css");

export default class Uploader extends Component {
  componentWillMount() {
    let companionUrl = "https://companion.uppy.io";
    this.uppy = new Uppy({
      // debug: true,
      autoProceed: false,
      restrictions: {
        maxFileSize: 1000000,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1
        // allowedFileTypes: ["image/*", "video/*"]
      },
      onBeforeUpload: (f) => {
        console.log({ f });
      }
    })
      .use(Dashboard, {
        trigger: ".UppyModalOpenerBtn",
        inline: true,
        target: ".DashboardContainer",
        replaceTargetContent: true,
        showProgressDetails: true,
        note: "Images and video only, 2–3 files, up to 1 MB",
        height: 470,
        metaFields: [
          { id: "name", name: "Name", placeholder: "file name" },
          {
            id: "caption",
            name: "Caption",
            placeholder: "describe what the image is about"
          }
        ],
        browserBackButtonClose: false
      })
      .use(GoogleDrive, {
        target: Dashboard,
        companionUrl
      })
      .use(Dropbox, {
        target: Dashboard,
        companionUrl
      })
      .use(OneDrive, {
        target: Dashboard,
        companionUrl
      });

    this.uppy.on("complete", (result) => {
      console.log("successful files:", result.successful);
      console.log("failed files:", result.failed);
    });
  }
  render() {
    return (
      <div>
        {/* <Dashboard //uppy dashboard component
          uppy={this.uppy}
          plugins={[
            "GoogleDrive",
            "Dropbox" //you can add more plugins here
          ]}
        /> */}
      </div>
    );
  }
}
