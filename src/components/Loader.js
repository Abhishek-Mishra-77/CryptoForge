import PulseLoader from "react-spinners/PulseLoader";

const Loader = () => {
    return (
        <div className='loader'>
            <PulseLoader
                color="#36d7b7"
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Loader;