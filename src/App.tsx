import React from 'react'
import './style/app.less'
import softbg from '@/assets/softbg.png'
import platform from '@/assets/icon-platform.png'


function App() {
  return <>
    <h2>lyh-react</h2>
    <img src={softbg} alt="小于10kb的图片" />
    <img src={platform} alt="大于于10kb的图片" />
    {/* <div>123</div> */}
  </>
}

export default App