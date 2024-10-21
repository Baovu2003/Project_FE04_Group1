// Story.js
import React from 'react';
import './Story.css';
import { Container, Row, Col } from 'react-bootstrap';
import video from "../../../../assets/videoframe_0.mp4";
import { Link } from 'react-router-dom';
function Story() {
  return (
    <>
      <div className="bao-subheadline">
        <div className="bao-subheadline-deco-line"></div>
        <div className="bao-subheadline-label">Ours Story Coffee</div>
        <div className="bao-subheadline-deco-line"></div>
      </div>

      <Container className="story">
        <Row className="align-items-center">
          <Col lg={6}>
            <video
              autoPlay
              loop
              muted
              className="story-video"
            >
              <source src={video} type="video/mp4" />
            </video>
          </Col>
          <Col lg={6} className="story-text">
            <h2 className="story-title">
              Even the all-powerful Pointing has no control about the blind texts.
            </h2>
            <p className="story-description">
              It is a paradisematic country, in which roasted parts of sentences
              fly into your mouth. Even the all-powerful Pointing has no control
              about the blind texts it is an almost unorthographic life. One day,
              however, a small line of blind text by the name of Lorem Ipsum
              decided to leave for the far World of Grammar.
            </p>
            <Link href="#" className="story-link">
              Read the full Story
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Story;
