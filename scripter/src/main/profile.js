const Profile = ({user}) => {
    return ( 
        <section className='d-flex my-5 flex-column gap-5 align-items-center'>
          <header className='container d-flex flex-column align-items-start w-100'>
            <img src="/scripter.svg" width={60} height={60} alt="scripter logo" />
            <h1>{user.name}</h1>
            <div className='text-white-50'>
              {user.email}
            </div>
            <div className="d-flex flex-column gap-2">
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, provident!</li>
            </div>
          </header>
        </section>
     );
}
 
export default Profile;