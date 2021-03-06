import styled from "styled-components";

export const StyledInterview = styled.div`
  .video-container {
    width: 420px;
    height: 220px;
    margin-left: auto;
    margin-right: auto;
    padding-tio: 50px;
    position: relative;
  }
  .local-video {
    width: 100px;
    position: absolute;
    right: 100px;
    top: 3px;
    border: 1px solid #fff;
  }
  video {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  .username {
    cursor: pointer;
  }
`;
