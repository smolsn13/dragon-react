import React from 'react';

 const Gallery = props => {

   const dragonNames = props.dragons.map(function(dragon, index) {
     return <span key={index}>{dragon} </span>
   })

    return (
      <section class="bg-light" id="portfolio">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <h2 class="section-heading text-uppercase">Meet Our Dragons</h2>
              <h3 class="section-subheading text-muted">Here are the dragons we have available. Please signup or login to bring one home to your cave today!</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-6 portfolio-item">
              <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                <div class="portfolio-hover">
                  <div class="portfolio-hover-content">
                    <i class="fa fa-plus fa-3x"></i>
                  </div>
                </div>
                <img class="img-fluid" src={dragonNames} alt="" />
              </a>
              <div class="portfolio-caption">
                <h4>{dragonNames}</h4>
                <p class="text-muted">{dragonNames}</p>
              </div>
            </div>
          </div>
        </div>
      </section>


    )
  }

export default Gallery;
