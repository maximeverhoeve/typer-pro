import React from 'react';

const SceneLights: React.FC = () => {
  return (
    <>
      <ambientLight intensity={2} />
      <pointLight position={[0, 5, 10]} intensity={1} />
    </>
  );
};

export default SceneLights;
