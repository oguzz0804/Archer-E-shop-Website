import React from "react";
import "../../css/Product.css";
import { BlackButton } from "../Button/BlackButton";

export const IndexPresentation = () => {
  return (
    <div style={{ marginBottom: "100px" }}>
      <div className="coverPage">
        <div className="coverPage-details">
          <h2>Enjoy the fresh air.</h2>
          <p>Explore Our Products</p>
          <BlackButton
            text={`Explore Now`}
            link={`/category/All`}
            submit={`home-button`}
          />
        </div>
      </div>
      <div className="products">
        <div className="home-flex">
          <img src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/000000/external-cup-award-vitaliy-gorbachev-fill-vitaly-gorbachev-6.png" width="120" alt="Logo FlatIcon" />
          <h3>Flexible Shoes</h3>
          <p>
            Flexibility. Runners and walkers need good shoe flexibility, but the location of it matters.
            Most running shoes are more flexible in the midfoot or arch, which support the runner's
            constant strike at their midfoot or the ball of their foot. Walkers need good arch flexibility
            since they use their toes to push off.
          </p>
          <BlackButton
            text={`View`}
            link={`/category/Shoes`}
            submit={`home-button`}
          />
        </div>
        <img src="https://images.unsplash.com/photo-1562183241-840b8af0721e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1965&q=80" className="img1" alt="Nike" />
        <img src="https://images.unsplash.com/photo-1577983072945-4a01dcd3439a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=408&q=80" className="img2" alt="Nike" />
      </div>
      <div className="products2">
        <img src="https://contents.mediadecathlon.com/p2086715/k$311255ca4999c3949aa6b4db3841347b/sq/kadin-siyah-mavi-tayt-yol-kosusu-kiprun-care.jpg?format=auto&f=646x646" className="img3" alt="Yeezy" />
        <img src="https://contents.mediadecathlon.com/p2086866/k$9dd6fa5e87c977a29552ce8a02735778/sq/erkek-kosu-tayt-siyah-gri-kiprun-warm.jpg?format=auto&f=646x646" className="img4" alt="Yeezy" />
        <div className="home-flex2">
          <img src="https://img.icons8.com/ios-filled/100/000000/tights.png" width="120" alt="FlatIcon" />
          <h3>Sportswear</h3>
          <p>
            Sportswear or activewear is clothing, including footwear, worn for sport or physical exercise.
            Sport-specific clothing is worn for most sports and physical exercise, for practical,
            comfort or safety reasons. Gym trousers should only be worn for light activity such as
            weights and not for running or squash
          </p>
          <BlackButton
            text={`View`}
            link={`/category/Clothes`}
            submit={`home-button`}
          />
        </div>
      </div>
      <div className="products">
        <div className="home-flex">
          <img src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/000000/external-cup-award-vitaliy-gorbachev-fill-vitaly-gorbachev-6.png" width="120" alt="Logo FlatIcon" />
          <h3>Durable Equipments</h3>
          <p>
          Sporting equipment, also called sporting goods, are the tools, materials, apparel, and gear used to compete in a sport and varies depending on the sport. 
          The equipment ranges from balls, nets, and protective gear like helmets. 
          Sporting equipment can be used as protective gear or a tool used to help the athletes play the sport.
          Over time, sporting equipment has evolved because sports have started to require more protective gear to prevent injuries. 
          Sporting equipment may be found in any department store or specific sporting equipment shops.
          </p>
          <BlackButton
            text={`View`}
            link={`/category/Equipments`}
            submit={`home-button`}
          />
        </div>
        <img src="https://images.unsplash.com/photo-1603077492340-e6e62b2a688b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" className="img1" alt="Equipments" />
        <img src="https://images.unsplash.com/photo-1580536353243-c40df64db72f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80" className="img2" alt="Thermos" />
      </div>
    </div>
  );
};