import React, {useState, useEffect} from 'react'
import { Container, Form , Row, Col, FloatingLabel, Navbar, } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import Button from '@mui/material/Button'
import Spinner from './Spinner';
import { Box, Typography, Modal } from '@mui/material';
import Alert from '@mui/material/Alert';




export default function Home() {

  const [prompt, setPrompt] = useState()
  const [len, setLen] = useState(25)
  const [resp, setResp] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [job, setJob] = useState("")
  const [position, setPosition] = useState(0)
  const [seconds, setSeconds] = useState()
  const [curTime, setCurTime] = useState()
  const [status, setStatus] = useState("Ready")
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [jobChecked, setJobChecked] = useState(false)
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  
  const model = 'https://huggingface.co/bigscience/bloom?text=Which+is+the+correct+preposition%3F+I%27m+born+X+July.+X+is+the+preposition+in%0AHe+sat+X+a+chair.+X+is+the+preposition+on%0AShe+drove+X+the+bridge.+X+is+the+preposition'
  const video = 'https://www.youtube.com/watch?v=3EjtHs_lXnk'
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  useEffect(()=>{
    if(!resp && !firstLoad){
      setLoading(true)
    } else{
      setLoading(false)
    }
  }, [submitted])

  useEffect(()=>{
    if(job){
       
    if(status.includes('fin')){
      getResult()
    } else{
      console.log(status)
      checkJob()
    } 
  
    
  }
  }, [jobChecked])
  


  async function startJob(){
    
    console.log("Starting Job")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "prompt": prompt,
      "length": len
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://bloom-app-ibiggy.herokuapp.com/promptMessage", requestOptions)
      .then(response => response.text())
      .then(result =>  setJob(result))
      .catch(error => setResp(error)); 
    
    checkJob()
    
  }

  async function checkJob(){
    await new Promise(r => setTimeout(r, 1000));
    let cursec = (new Date().getTime())/1000
    setCurTime(cursec- seconds)
    setJobChecked((prev)=> !prev)
    if(job){
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "jobID": job
    }).replace(/\\"/g, '');
    console.log(raw)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://bloom-app-ibiggy.herokuapp.com/getStatus", requestOptions)
      .then(response => response.text())
      .then(result => setStatus(result))
      .catch(error => setStatus(error))
    
    
  }
}

  async function getResult(){
    console.log("Attempting to get result")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "jobID": job
    }).replace(/\\"/g, '');;

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://bloom-app-ibiggy.herokuapp.com/getResult", requestOptions)
      .then(response => response.text())
      .then(result => setResp(result.replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n")))
      .catch(error => console.log('error', error));
    
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" })
    setJob(false)
  }

  function getShortJob(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "prompt": prompt,
      "length": len
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://bloom-app-ibiggy.herokuapp.com/promptMessage", requestOptions)
      .then(response => response.text())
      .then(result => setResp(result.replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n").replace("\\n", "\n")))
      .catch(error => console.log('error', error));
      window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" })
  }

  function handleSubmit(){
    setSeconds((new Date().getTime())/1000)
    setFirstLoad(false)
    setSubmitted((prev) => !prev)
    setJob(false)
    setResp(false)
    setStatus("Not Started")
    if(len < 51){
        getShortJob()
    } else{
      startJob()
    }
    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" })
    console.log(prompt)
    console.log(len)
  }

  return (
    <div>
        <Navbar variant='dark' bg='dark' className='d-flex'>
        <Navbar.Brand className='m-3'>Experience Bloom</Navbar.Brand>
        <Navbar.Text className='d-flex justify-content-center'>Developed by Ian Bigford 2022</Navbar.Text>
      </Navbar>
      <Container style={{maxWidth: '800px'}}>
        <div className='m-3'>
        <h3>Welcome!</h3>
        <p>This is a web app that allows you access the famous <a href={model}>Bloom Model</a>- a large language model (LLM)</p>
        <p>To oversimplify, this LLM takes a prompt an guesses what text will come next. What makes this model special is sheer amount of data that was used to develop this model. Specifically 175 billion parameters including most human and computer languages.</p> 
        <p>If you want more detail, check out <a href={video}>this great video</a> about the model. For help on how to use the model check out the prompting section of the video found at 4:07.
        </p>

        <Accordion defaultActiveKey={0}>
          <Accordion.Item>
        
        <Accordion.Header><strong>Instructions:</strong></Accordion.Header>
        <Accordion.Body>
        <p>The app is simple:
          <ol>
            <li>Input something.</li>
            <li>Select the size of the response you want to receive back in character length.</li>
            <li>Wait for up to 1 minute.</li>
            <li>Receive the response.</li>
            </ol>
            <Row>Here are a few examples:</Row>
            
            <Row><Button onClick={handleOpen1}>Example 1: Chat Bot</Button></Row>
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Chat Bot Example</strong>
                </Typography>
                <Typography>Here we write the prompt like a dialogue to get the prediction outcome to be as such.</Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Prompt:</strong>
                <br/> Student: Hello teacher 
                <br/>Teacher:
                <br/> (Set length to 25 to return 25 tokens)
            
            <br/><br/><strong>Response:</strong>
            <br/>"Student: Hello teacher
            <br/>Teacher: Hello, how are you doing today?
            <br/>Student: I'm good
            <br/>Teacher: I'm good too. Thank you for the lesson"
                </Typography>
                <Row>
                <Col></Col>
                <Col></Col>
                <Col><Button onClick={handleClose1}>Close</Button></Col>
                </Row>
                
              </Box>
            </Modal>
            <Row><Button onClick={handleOpen2}>Example 2: Complete The Sentence Example</Button></Row>
            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Complete the sentence</strong>
                </Typography>
                <Typography>Here we write the start of a sentence to see what the model returns.</Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Prompt:</strong>
                <br/> The benefits of aerobic exercise are  
                <br/> (Set length to 25)
            <br/><br/><strong>Response:</strong><br/>
            "The benefits of aerobic exercise are well known and include improvements in cardiovascular health and muscle strength. It is also well established that exercise can increase the rate of bone"
                </Typography>
                <Row>
                <Col></Col>
                <Col></Col>
                <Col><Button onClick={handleClose2}>Close</Button></Col>
                </Row>
              </Box>
            </Modal>
            <Row><Button onClick={handleOpen3}>Example 3: Ask for sentiment and key themes</Button></Row>
            <Modal
              open={open3}
              onClose={handleClose3}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <strong>Sentiment Example</strong>
                </Typography>
                <Typography>Here we write the prompt like a dialogue to get the prediction outcome to be as such.</Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Prompt:</strong>
                <br/> Review:
                <br/>(Product Review from Amazon)
                <br/>(Set Length to 75)
                <br/>
                <br/>Questions:
                <br/>1. What is this about?
                <br/>2. Is it positive?
                <br/>3. What were the key points?

                <br/><br/>Answers:
                <br/>1.
                
            
            <br/><br/><strong>Response:</strong>
            <br/>Answers:
            <br/> 1. I would say that it is a bit negative, since you are the victim of a product defect, and (Brand Name) should have been able to spot it before you did.
            <br/>2. This is positive, since it shows that (Brand Name) cares about the quality of their products and they are willing to take responsibility for it.
            <br/>3. In this case, I think that the main point is that...."
                </Typography>
                <Row>
                <Col></Col>
                <Col></Col>
                <Col><Button onClick={handleClose3}>Close</Button></Col>
                </Row>
              </Box>
            </Modal>
            

          </p>
          </Accordion.Body>
          </Accordion.Item>
          </Accordion>
        </div>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className='m-3'>
            
              <Form.Label className='mx-2'>Enter Your Prompt Here:</Form.Label>
              <Form.Control  style={{minHeight: '200px'}} value={prompt} onChange={(e)=> setPrompt(e.target.value)} as="textarea" rows={4} placeholder="Input Your Text Here" />
            
          </Form.Group>

          {len && len > 50 && <Alert className='m-3' severity='warning'>Warning: Requests over 50 may be placed in a queue with other requests and may take longer to process.</Alert>}

          <Form.Group>
            
            <FloatingLabel
            controlId='floatingInput'
            label="Number of Words To Return"
            className='m-3'> 
              <Form.Control value={len} onChange={(e) => setLen(e.target.value)} type='number' min={10} max={300} placeholder="Length of Returned String"/>
            </FloatingLabel>
          </Form.Group>
        </Form>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col><Button className='mb-5' onClick={handleSubmit} style={{minHeight:"50px", minWidth:"200px", backgroundColor:"black"}} variant='contained'>Submit</Button> </Col>
        </Row>
        
        
        <Container style={{height:'50px'}}>
        {position && position > 0 && status.includes("que") ? <strong>Position in Queue:{position}<br/></strong> : <strong></strong>}
        {status && status.includes("st") && <strong >Status: Working... </strong>}
        {status && status.includes("fin") && <strong >Status: Completed </strong>}
        {status && status.includes("Na") && <strong style={{color:"red"}}>This app sleeps after a period of disuse, please press submit again to wake it.</strong>}
        {status && status=="Not Started" && !resp && <strong>Status: Requesting </strong>}
        {status && status=="Not Started" && resp && <strong>Status: Complete </strong>}
        {status && status=="Ready" && <strong>Status: Ready... </strong>}
        {status && status.includes("que") && <strong>Status: Waiting in Queue </strong>}
        {status && status.includes("fail") && <strong className='m-3' style={{color:"red"}}>Status: Failed. Please reload and try again. Note your prompt may be too long or length to big</strong>}
        {curTime && status!="Not Started" && <strong><br/>Time Elapsed: {curTime.toFixed(2)} seconds</strong>}
        </Container>

        {!resp && loading &&
        <Container style={{height:'400px'}}  className=' mt-2 d-flex justify-content-center'>
        <Spinner />
        
        </Container>
        
        }
        
        <Container>

        {resp.length > 5 && 
        <div style={{height:'400px'}} className='mb-5'>
          <h4>Response:</h4>
          <div style={{whiteSpace:'pre-line'}}>{resp}</div>
        </div>
        }
        </Container>
      

      </Container>

    </div>
  )
}
