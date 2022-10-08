const img = require('../images/comming-soon.png')
const HomePage = () => {
    return (
        <div className="HomePage">
            <div>
                <img src={String(img)}></img>
            </div>
        </div>
    )
}
export default HomePage;