import React from 'react'
import { Link } from 'react-router-dom'
function AppBar() {

    const navContent = [
        {Logo : "coursERA", href : "/"},
        {section : "courses", href : "/courses"},
        {section : "Test-series", href : "/test-series"},
        {section : "Scholorships", href : "/scholorships"},
        {section : "Result", href : "/results"},
        {section : "Strudy Material", href : "/study-material"},        
    ]

  return (
    <>
    <main>
        <nav>
            <div className='flex justify-between items-center bg-red-500 p-4 ' >
                <div id='logo' >
                    <Link className='text-semibold text-2xl' to={"/"} >coursERA</Link>
                </div>

                {/* Nav-content */}
                <div className='flex gap-10' >
                    {navContent.map((items, index) => {
                        return <Link className='text-lg' to={items.href} key={index} >{items.section}</Link>
                    })}
                    {/* AuthBtn */}
                    <div>
                        <Link to={"/signup"} className='border-2 border-white px-4 py-2 rounded-lg hover:bg-white/90 hover:text-red-500'>Signup</Link>
                    </div>
                </div>
            </div>
        </nav>
    </main>
    </>
  )
}

export default AppBar