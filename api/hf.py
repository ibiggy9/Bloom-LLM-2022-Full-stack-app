from urllib import response
from huggingface_hub import InferenceApi
import time
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from rq import Queue
from rq.job import Job
from worker import conn

q = Queue(connection=conn)


access_token = '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'
inference = InferenceApi("bigscience/bloom", token = access_token)
app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"] 
)

class PromptText(BaseModel):
    prompt: str
    length: int

class Result(BaseModel):
    jobID: str

class Status(BaseModel):
    jobID: str



@app.post('/getStatus')
async def status(status: Status):
    job = Job.fetch(status.jobID, connection=conn)
    return job.get_status()

@app.post('/getResult')
async def result(res: Result):
    task = Job.fetch(res.jobID, connection=conn)
    return task.result


@app.post('/promptMessage')
async def promptTake(prompt: PromptText):
    if prompt.length > 50:
        resp = q.enqueue(infer, prompt.prompt, prompt.length)
        id = resp.get_id()
        print(id)
        return resp.get_id()
    else:
        resp = infer(prompt.prompt, prompt.length)
        return resp


def infer(prompt,  
          max_length,
          top_k = 0,
          num_beams = 0,
          no_repeat_ngram_size = 2,
          top_p = 0.9,
          seed=42,
          temperature=0.7,
          greedy_decoding = False,
          return_full_text = False):
    

    top_k = None if top_k == 0 else top_k
    do_sample = False if num_beams > 0 else not greedy_decoding
    num_beams = None if (greedy_decoding or num_beams == 0) else num_beams
    no_repeat_ngram_size = None if num_beams is None else no_repeat_ngram_size
    top_p = None if num_beams else top_p
    early_stopping = None if num_beams is None else num_beams > 0

    params = {
        "max_new_tokens": max_length,
        "top_k": top_k,
        "top_p": top_p,
        "temperature": temperature,
        "do_sample": do_sample,
        "seed": seed,
        "early_stopping":early_stopping,
        "no_repeat_ngram_size":no_repeat_ngram_size,
        "num_beams":num_beams,
        "return_full_text":return_full_text
    }
    
    s = time.time()
    response = inference(prompt, params=params)
    #print(response)
    proc_time = time.time()-s
    #print(f"Processing time was {proc_time} seconds")
    text = list(response[0].items())[0] 
    finalText = text[1]
    #.replace("\n", '')
    print(finalText)
    return finalText



