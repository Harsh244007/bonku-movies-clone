import React, { useState } from "react";
import Modal from "../Common/Modal";
import DropdownSelect from "../Common/DropdownSelect";

interface SeriesComponentProps {
  seriesData: { title: string; imdb: string; series: number[][] }[];
}

const SeriesComponent: React.FC<SeriesComponentProps> = ({ seriesData }) => {
  const [selectedSeriesIndex, setSelectedSeriesIndex] = useState<number>(0);
  const [selectedSesession, setSelectedSesession] = useState<number>(0);
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  const handleSeriesChange = (index: number) => {
    setSelectedSeriesIndex(index);

    setSelectedEpisodeIndex(0); // Reset the episode selection when series changes
  };

  const handleEpisodeChange = (index: number) => {
    setSelectedEpisodeIndex(index);
  };
  const handleSessionChange = (index: number) => {
    setSelectedSesession(index);
  };

  const handleWatchClick = () => {
    setEmbedUrl(
      `https://autoembed.to/tv/imdb/${seriesData[selectedSeriesIndex].imdb}-${
        selectedSesession + 1
      }-${selectedEpisodeIndex + 1}`
    );
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setEmbedUrl(null);
  };

  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-semibold mb-4">Series Component</h2>

      <DropdownSelect
        label="Select Name"
        options={seriesData.map((series, index) => ({
          value: index,
          label: series.title,
        }))}
        value={selectedSeriesIndex}
        onChange={handleSeriesChange}
      />

      {seriesData.length > 0 && (
        <div>
          <DropdownSelect
            label="Select Series"
            options={seriesData[selectedSeriesIndex].series.map((_, index) => ({
              value: index,
              label: `Session ${index + 1}`,
            }))}
            value={selectedSesession}
            onChange={handleSessionChange}
          />

          <DropdownSelect
            label="Select Episode"
            options={seriesData[selectedSeriesIndex].series[
              selectedSesession
            ].map((episode, index) => ({
              value: index,
              label: `Episode No. ${index + 1} ${episode}`,
            }))}
            value={selectedEpisodeIndex}
            onChange={handleEpisodeChange}
          />
        </div>
      )}

      <button
        onClick={handleWatchClick}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-400 focus:outline-none"
      >
        Watch
      </button>
      {showModal && (
        <Modal onClose={closeModal}>
          {embedUrl && (
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              title="Embedded Content"
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default SeriesComponent;
