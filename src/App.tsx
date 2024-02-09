
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion"
import {useState } from "react";
;


const Wrapper =styled(motion.div) `
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg,rgb(41, 213, 58),rgb(17, 174, 114));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap:10px;
  div:first-child,
  div:last-child {
    grid-column:  span 2;
  }
`

const Box = styled(motion.div) `
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`

function App() {
  const[id,setId] = useState<null|string>(null);
  
    return (
      <Wrapper>
        <Grid>
          {[1,2,3,4].map(n=> (
          <Box onClick ={() => setId(n+"")} key={n} layoutId={n+""}/>))}
        </Grid>
        <AnimatePresence>
          {id ? 
          <Overlay 
          onClick={() => setId(null)}
          initial={{ backgroundColor : "rgba(0,0,0,0)" }} 
          animate={{backgroundColor : "rgba(0,0,0,0.6)"}}
          exit={{backgroundColor : "rgba(0,0,0,0)"}}
          >
            <Box layoutId={id} style={{height:200, width:400}}/>
          </Overlay> : null}
        </AnimatePresence>
      </Wrapper>
    );
  }
  
  
export default App;
