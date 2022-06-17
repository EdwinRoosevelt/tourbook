import React from 'react'

function About() {
  return (
    <section id="tourdetails">
      <div className="container mt-5 p-sm-5 py-4 bg-white">
        {/* Section TITLE */}
        <div className="flex justify-content-between">
          <div>
            <h1 className="display-4">ABOUT</h1>
            {/* <p className="text-muted mb-5">
              All the specifics about this trip!
            </p> */}

            <h1 className="display-6 mt-5">this Project</h1>
            <p className="text-muted fs-5 mb-4">
              An end to end application designed using various modern
              technologies.
            </p>
            <p className="text-muted fs-5 mb-4">
              It's designed to help plan tours, share them with friends and
              family and make the whole process of tour planning a fun.
            </p>
            <p className="text-muted fs-5 mb-4">
              This minimum viable product is undergoing continous developemnt.
            </p>

            <h1 className="display-6 mt-5">Me</h1>
            <div className="flex wrap gap-3 py-3">
              <div className="card p-3">hi</div>
              <div className="card p-3">hi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About