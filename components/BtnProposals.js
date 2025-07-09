"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { MdOutlineBookmarkBorder } from "react-icons/md";

const  BtnProposals = ({
  sendText = "Send Proposal",
  saveText = "Save Job",
  sendHref = "/artist-page/send-proposal",
  saveIcon = <MdOutlineBookmarkBorder className="w-5 h-5" color="#3A98BB" />,
  saveButtonStyle = {},
  containerClassName = "",
}) => {
  return (
    <div
      className={`flex lg:flex-col lg:gap-6 gap-4 justify-center items-center lg:bg-[#FAFAFA] bg-[#FFFFFF] px-4 py-4 lg:px-6 lg:py-8 lg:w-screen lg:max-w-[80%] w-screen max-w-[100%] border border-[#EAEAEA] lg:rounded-2xl ${containerClassName}`}
    >
      <div>
        <CustomButton
          text={sendText}
          className="w-48 text-[#035A7A]"
          href={sendHref}
        />
      </div>

      <div>
        <CustomButton
          className="w-48 text-[#767676] flex items-center justify-center gap-2"
          icon={saveIcon}
          text={saveText}
          style={{
            background: "transparent",
            color: "#767676",
            border: "1px solid #3A98BB",
            ...saveButtonStyle,
          }}
        />
      </div>
    </div>
  );
};

export default BtnProposals;
