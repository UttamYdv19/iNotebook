import React from "react";

export default function About() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">About Us</h2>
              <p className="card-text">
                Welcome to our platform! We are a passionate team of developers dedicated to creating
                intuitive, efficient, and user-centric web applications. Our goal is to build software that solves
                real-world problems and enhances user experiences through modern technology and thoughtful design.
              </p>
              <p className="card-text">
                With a focus on performance and clean architecture, we follow industry best practices in every
                line of code. From responsive layouts using Bootstrap to optimized APIs and modular components,
                we ensure every part of our stack is reliable, scalable, and secure.
              </p>
              <p className="card-text">
                This project is built with the MERN (MongoDB, Express, React, Node.js) stack and follows modern
                React development patterns including reusable components, context-based state management,
                and production-grade optimizations.
              </p>
              <h5 className="mt-4">Why Choose Us?</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✔️ Clean & maintainable codebase</li>
                <li className="list-group-item">✔️ Responsive design with Bootstrap</li>
                <li className="list-group-item">✔️ Fast performance and SEO-friendly structure</li>
                <li className="list-group-item">✔️ Continuous improvement and innovation</li>
              </ul>
              <p className="card-text mt-4">
                We appreciate your support and trust in our work. Feel free to reach out for feedback,
                collaborations, or just to say hello!
              </p>
              <p className="text-muted text-end">— The Development Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
