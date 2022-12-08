import React from "react";

const TrackersCheckbox = ({
  trackersCategory,
  trackersSubCategory,
  trackers,
  handleTrack,
  setTrackersCategory,
  setTrackers,
}) => {
  return (
    <section className="trackers-section">
      <h2>Relevant trackers</h2>
      <section className="trackers">
        <div className="trackers">
          {trackersCategory.map((trackerCategory) => {
            return (
              <label
                htmlFor={trackerCategory.name}
                key={trackerCategory.name}
                className="tracker-category-checkbox"
              >
                <div className="tracker-category-checkbox">
                  <input
                    type="radio"
                    id={trackerCategory.name}
                    name="categorySelector"
                    value={trackerCategory.name}
                    onChange={() =>
                      handleTrack(
                        trackerCategory._id,
                        setTrackersCategory,
                        trackersCategory,
                        "category"
                      )
                    }
                    checked={trackerCategory.status}
                  />
                  <div className="tracker-cat-img">
                    <img
                      src={trackerCategory.picture}
                      alt={trackerCategory.name}
                    />
                  </div>

                  <h3>{trackerCategory.name}</h3>
                </div>
              </label>
            );
          })}
        </div>
      </section>
      {/* Tracker category section ends here * */}
      <section>
        {trackersCategory.map((trackerCategory) => {
          return (
            trackerCategory.status &&
            trackersSubCategory
              .filter(
                (trackerSubCategory) =>
                  trackerSubCategory.category === trackerCategory._id
              )
              .map((trackerSubCategory) => {
                return (
                  <div key={trackerSubCategory._id}>
                    <h3 className="tracker-subcategory">
                      {trackerSubCategory.name}
                    </h3>
                    <div className="trackers-list-selector">
                      {trackers
                        .filter(
                          (tracker) =>
                            tracker.subcategory === trackerSubCategory._id
                        )
                        .map((tracker) => {
                          return (
                            <div key={tracker._id} className="tracker-checkbox">
                              <label htmlFor={tracker.name}>
                                <input
                                  type="checkbox"
                                  id={tracker.name}
                                  name={tracker.name}
                                  value={tracker.name}
                                  checked={tracker.status}
                                  onChange={() =>
                                    handleTrack(
                                      tracker._id,
                                      setTrackers,
                                      trackers
                                    )
                                  }
                                />
                                <span>{tracker.name}</span>
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })
          );
        })}
      </section>
    </section>
    // Trackers section ends here
  );
};

export default TrackersCheckbox;
