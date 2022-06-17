import React from 'react'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/About.module.css'
import firebase from '../public/icons/google_firebase.png'
import Nextjs from '../public/icons/Nextjs.svg'
import AmazonDynamoDB from '../public/icons/AmazonDynamoDB.png'
import bootstrap from "../public/icons/bootstrap.png";
import redux from "../public/icons/redux.svg";
import git from "../public/icons/git.svg";
import edwinPage from '../public/images/edwinroosevelt_page.png'


function About() {
  return (
    <>
      <Head>
        <title>About Tourbook</title>
        <link rel="icon" href="/tourbook_icon.svg" />
      </Head>
      <section id="tourdetails">
        <div className="container p-sm-5 py-4 bg-white">
          <h1 className="display-4">ABOUT</h1>
          <h1 className="display-6 mt-sm-5 mt-3">Me</h1>
          <div className="flex flex-wrap justify-content-between gap-3 py-3">
            <a href="https://www.edwinroosevelt.com" target="_blank">
              <div className={`card mb-3 shadow ${styles.custom}`} style={{ maxWidth: "540px" }}>
                <Image src={edwinPage} />
              </div>
            </a>
          </div>

          {/* <p className="text-muted mb-5">
              All the specifics about this trip!
            </p> */}

          <h1 className="display-6 mt-sm-5 mt-3">Project</h1>
          <p className="text-muted fs-5 mb-4">
            An end to end application designed using various modern
            technologies.
          </p>
          <p className="text-muted fs-5 mb-4">
            It's designed to help plan tours, share them with friends and family
            and make the whole process of tour planning a fun.
          </p>
          <p className="text-muted fs-5 mb-4">
            This minimum viable product is undergoing continous developemnt.
          </p>

          <h1 className="display-6 mt-sm-5 mt-3">Tools</h1>
          <div className="flex flex-wrap justify-content-between gap-3 py-3">
            <div className="card mb-3 shadow" style={{ maxWidth: "340px" }}>
              <div className="row g-0">
                <div className="col-6 p-4">
                  <Image src={Nextjs} alt="Nextjs" />
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <h5 className="card-title fs-5">Next.js</h5>
                    <p className="card-text text-muted">
                      React framework for production
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 shadow" style={{ maxWidth: "340px" }}>
              <div className="row g-0">
                <div className="col-6">
                  <Image src={firebase} alt="firebase_logo" />
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <h5 className="card-title fs-5">Google Firebase</h5>
                    <p className="card-text text-muted">
                      Authentication - Google Single Sign-On
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 shadow" style={{ maxWidth: "340px" }}>
              <div className="row g-0">
                <div className="col-6">
                  <Image src={AmazonDynamoDB} alt="AmazonDynamoDB" />
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <h5 className="card-title fs-5">AWS DynamoDB</h5>
                    <p className="card-text text-muted">
                      NoSQL Database for storing all the user and tour data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 shadow" style={{ maxWidth: "340px" }}>
              <div className="row g-0">
                <div className="col-6 p-3">
                  <Image src={bootstrap} alt="bootstrapLogo" />
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <h5 className="card-title fs-5">Bootstrap</h5>
                    <p className="card-text text-muted">
                      Frontend toolkit for building fast, responsive sites.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 shadow" style={{ maxWidth: "340px" }}>
              <div className="row g-0">
                <div className="col-6 p-3">
                  <Image src={redux} alt="redux Logo" />
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <h5 className="card-title fs-5">Redux</h5>
                    <p className="card-text text-muted">
                      Simple and a powerful State Management tool
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3 shadow" style={{ maxWidth: "340px" }}>
              <div className="row g-0">
                <div className="col-6 p-3">
                  <Image src={git} alt="git Logo" />
                </div>
                <div className="col-6">
                  <div className="card-body">
                    <h5 className="card-title fs-5">Git | GitHub</h5>
                    <p className="card-text text-muted">
                      Version Control | Central code repository
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted fs-5">Shout out to</p>
          <p className="text-muted fs-5">
            <a
              className="text-primary"
              href="https://freepik.com"
              target="_blank"
            >
              {" "}
              freepik{" "}
            </a>
            - Free graphics and logos
          </p>
          <p className="text-muted fs-5">
            <a
              className="text-primary"
              href="https://mantine.dev"
              target="_blank"
            >
              {" "}
              Mantine{" "}
            </a>
            - React components Library
          </p>
          <p className="text-muted fs-5">
            <a
              className="text-primary"
              href="https://pexels.com"
              target="_blank"
            >
              {" "}
              Pexels{" "}
            </a>
            - Free stock photos &amp; videos to use everywhere
          </p>
        </div>
      </section>
    </>
  );
}

export default About