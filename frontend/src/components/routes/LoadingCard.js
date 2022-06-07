import React from 'react'
import { Skeleton,Card } from 'antd';
import { Spin, Space } from 'antd';
const LoadingCard = ({count}) => {
 
  const LoopCard = () =>{
  if(count<5){
    let cards = []
    for (let i=0; i< count;i++){
      cards.push( 
        
      <Card className='row md-4 mt-4'>
      <Skeleton active />

    </Card>
  )
    }
    return cards
  }
  else{
    
    return (   
      <div className=" mx-sm-5   ">
    <Space size="large">

    <Spin size="large" / >
  </Space>
  </div>)
    
    
  }
}

  return (
    <>
  <div >
        {LoopCard()}
        </div>
    </>
  )
}

export default LoadingCard
