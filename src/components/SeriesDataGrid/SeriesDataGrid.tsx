import React, { useState } from "react";
import Modal from "../Common/Modal";
import DropdownSelect from "../Common/DropdownSelect";

interface SeriesComponentProps {
  seriesData: { title: string; imdb: string; series: number[][] }[];
}

const localStorageObj = {
  nameIndex: 0,
  seriesIndex: 0,
  episodeIndex: 0,
};

const SeriesComponent: React.FC<SeriesComponentProps> = ({ seriesData }) => {
  const unparsedLocalStorageObj = localStorage.getItem("seriesDetails");
  const parsedLocalStorageObj = unparsedLocalStorageObj ? JSON.parse(unparsedLocalStorageObj) : null;
    const [selectedNameIndex, setSelectedNameIndex] = useState<number>(
    parsedLocalStorageObj && parsedLocalStorageObj.nameIndex && seriesData[parsedLocalStorageObj.nameIndex] ? Number(parsedLocalStorageObj.nameIndex) : 0
  );
  const [selectedSesession, setSelectedSesession] = useState<number>(
    parsedLocalStorageObj && parsedLocalStorageObj.seriesIndex && seriesData[parsedLocalStorageObj.nameIndex] && seriesData[parsedLocalStorageObj.nameIndex].series && seriesData[parsedLocalStorageObj.nameIndex].series[parsedLocalStorageObj.seriesIndex] ? Number(parsedLocalStorageObj.seriesIndex) : 0
  );
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number>(
    parsedLocalStorageObj && parsedLocalStorageObj.episodeIndex  && seriesData[parsedLocalStorageObj.nameIndex] && seriesData[parsedLocalStorageObj.nameIndex].series && seriesData[parsedLocalStorageObj.nameIndex].series[parsedLocalStorageObj.seriesIndex] && seriesData[parsedLocalStorageObj.nameIndex].series[parsedLocalStorageObj.seriesIndex][parsedLocalStorageObj.episodeIndex] ? Number(parsedLocalStorageObj.episodeIndex) : 0
  );
  const [showModal, setShowModal] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  const handleNameChange = (index: number) => {
    setSelectedNameIndex(index);
    localStorageObj["nameIndex"] = index;
    localStorageObj["seriesIndex"] = 0;
    localStorageObj["episodeIndex"] = 0;
    setSelectedEpisodeIndex(0);
    setSelectedSesession(0);
  };

  const handleEpisodeChange = (index: number) => {
    setSelectedEpisodeIndex(index);
    localStorageObj["episodeIndex"] = index;
  };
  const handleSessionChange = (index: number) => {
    setSelectedSesession(index);
    localStorageObj["nameIndex"] = index;
    setSelectedEpisodeIndex(0);
    localStorageObj["episodeIndex"] = 0;
  };

  const handleWatchClick = () => {
    setEmbedUrl(`https://autoembed.to/tv/imdb/${seriesData[selectedNameIndex].imdb}-${selectedSesession + 1}-${selectedEpisodeIndex + 1}`);
    setShowModal(true);
    localStorage.setItem("seriesDetails", JSON.stringify(localStorageObj));
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
        value={selectedNameIndex}
        onChange={handleNameChange}
      />

      {seriesData.length > 0 && (
        <div>
          <DropdownSelect
            label="Select Series"
            options={seriesData[selectedNameIndex].series.map((_, index) => ({
              value: index,
              label: `Session ${index + 1}`,
            }))}
            value={selectedSesession}
            onChange={handleSessionChange}
          />

          <DropdownSelect
            label="Select Episode"
            options={seriesData[selectedNameIndex].series[selectedSesession].map((episode, index) => ({
              value: index,
              label: `Episode No. ${episode} `,
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
              className="iframe"
              height="100%"
              title="Embedded Content"
            />
          )}
        </Modal>
      )}
    </div>
  );
};

export default React.memo(SeriesComponent);
