"use client"; // This is a Client Component
import styled, { keyframes } from "styled-components";

const ldsFacebook = keyframes`
  0% {
    top: 8px;
    height: 64px;
  }
  50%, 100% {
    top: 24px;
    height: 32px;
  }
`;

const Bar = styled.div`
	display: inline-block;
	position: absolute;
	left: 8px;
	width: 16px;
	background: currentColor; // or specify a color here, like #4267B2 (Facebook blue)
	animation: ${ldsFacebook} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
`;

const LoadingFacebook = styled.div`
	display: inline-block;
	position: relative;
	width: 80px;
	height: 80px;
`;

const FacebookSpinner = () => (
	<LoadingFacebook>
		<Bar style={{ left: "8px", animationDelay: "-0.24s" }} />
		<Bar style={{ left: "32px", animationDelay: "-0.12s" }} />
		<Bar style={{ left: "56px", animationDelay: "0s" }} />
	</LoadingFacebook>
);

export default FacebookSpinner;
