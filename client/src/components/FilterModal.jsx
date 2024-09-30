import Sidebar from '../sidebar/Sidebar';

const FilterModal = ({ closeFilterModal, handleChange, handleClick }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Filters</h3>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={closeFilterModal}
          >
            Close
          </button>
        </div>
        <Sidebar handleChange={handleChange} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default FilterModal;
