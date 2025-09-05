import san1 from "../assets/testImg/san1.jpg"
import san2 from "../assets/testImg/san2.jpg"

const MainPage = () => {
    return(
        <div>
            <div className="text-5xl bg-primaryColor">
                <h1>primaryColor</h1>
            </div>
            <div className="text-5xl bg-secondaryColor">
                <h1>secondaryColor</h1>
            </div>
            <div className="text-5xl bg-secondaryAccentColor">
                <h1>secondaryAccentColor</h1>
            </div>
            <div className="text-5xl bg-backgroundColor">
                <h1>backgroundColor</h1>
            </div>
            <div className="text-5xl bg-subFirstColor">
                <h1>subFirstColor</h1>
            </div>
            <div className="text-5xl bg-subSecondColor">
                <h1>subSecondColor</h1>
            </div>
            <div className="text-5xl bg-subButtonColor">
                <h1>subButtonColor</h1>
            </div>
            <div className="text-5xl bg-subButtonAccentColor">
                <h1>subButtonAccentColor.</h1>
            </div>
            <div>
                <img src={san1} height='200px' width='200px'></img>
            </div>
            <div>
                <img src={san2} height='200px' width= '200px'></img>
            </div>
        </div>
    )
}

export default MainPage;