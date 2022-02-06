import AddFruits from './components/AddFruits'
import Fruits from './components/Fruits'
function App() {
  return (
    <div className="container">
       <div className='row'>
            <div className='col-md-8'>
                <Fruits/>
            </div>
            <div className='col-md-4'>
                <AddFruits/>
            </div>
       </div>
     
    </div>
  );
}

export default App;
