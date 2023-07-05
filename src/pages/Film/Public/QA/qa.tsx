import React, { useEffect } from 'react'
import { api } from '../../../../services/api'
import { Img, Text } from '../../../../components/Elements'
import Header from '../../../../components/Header/header';
import Footer from '../../../../components/Footer/footer';
import { Accordion } from 'react-bootstrap';
import './qa.css';
interface QandA {
  headerImg?:string;
  headerTitle: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
  paragraph4?: string;
  paragraph5?: string;
  paragraph6?: string;
  content1?: string;
  content2?: string;
  content3?: string;
  content4?: string;
  content5?: string;
  content6?: string;
}

const QandAPage: React.FC = () => {
  const qanda: QandA = {
    headerImg: '',
    headerTitle: ''
  }

  const [qa, setQandA] = React.useState(qanda)
  useEffect(() => {
    retrieveQandA('EN', 'q_and_a')
  }, [])

  const retrieveQandA = async (language: string, formLayout: string) => {
    await api
      .get(`auth/${language}/${formLayout}`)
      .then((response) => {
        setQandA(response.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  return (
    <>
    <div className="bg-gray_900 flex flex-col items-start justify-start mx-auto w-full">
        <div className="flex font-roboto items-center w-full">
          <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
        </div>
        <Text
          className="capitalize font-arial font-bold md:ml-[0] ml-[103px] mt-[51px] text-left text-white_A700 w-auto"
          variant="body11"
        >{qa.headerTitle}</Text>
        <div className="flex flex-col font-montserrat md:gap-10 gap-28 items-center mb-[7px] mt-3.5 w-full">
          <div className="md:h-[760px] h-[764px] max-w-[1313px] mx-auto md:px-5 relative w-full">
            <div className="md:h-[760px] h-[764px] m-auto w-full">
              <div className="absolute h-[760px] inset-y-[0] left-[0] my-auto rounded-bl-[9px] rounded-br-none rounded-tl-[9px] rounded-tr-none shadow-bs8 w-[33%] sm:w-full">
                <Img
                  src={qa.headerImg}
                  className="h-[760px] m-auto object-cover rounded-bl-[9px] rounded-br-none rounded-tl-[9px] rounded-tr-none w-full"
                  alt="rectangle513"
                />
                <Text
                  className="absolute capitalize font-medium inset-x-[0] mx-auto text-left text-white_A700 top-[11%] tracking-[0.48px]"
                  variant="body11"
                >
                  <>
                    Feel Free to <br />
                    drop us your
                    <br />
                    feedback
                  </>
                </Text>
              </div>
              <div className="absolute bg-gray_800 h-[760px] inset-y-[0] my-auto right-[0] rounded-[20px] shadow-bs8 w-[69%]"></div>
            </div>
            <div
              className="common-pointer absolute flex font-roboto h-max inset-y-[0] items-center justify-start my-auto p-[31px] sm:px-5 right-[0] w-[69%]"
            >
              <div className="flex flex-col gap-15 items-start justify-start mb-[39px] mt-[25px] self-stretch w-auto md:w-full">
                <div className = "notification flex-col font-montserrat gap-2.5 grid items-center max-w-[1265px] mt-[26px] mx-auto md:px-5 w-full">
             <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header >{qa.paragraph1} </Accordion.Header>
              <Accordion.Body >
             {qa.content1}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
                </div>
                <div className = "notification flex-col font-montserrat gap-2.5 grid items-center max-w-[1265px] mt-[26px] mx-auto md:px-5 w-full">
                <Accordion>
                <Accordion.Item eventKey="0">
                <Accordion.Header >{qa.paragraph2} </Accordion.Header>
                <Accordion.Body >
                {qa.content2}
                </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                  </div>
                  <div className = "notification flex-col font-montserrat gap-2.5 grid items-center max-w-[1265px] mt-[26px] mx-auto md:px-5 w-full">
                <Accordion>
                <Accordion.Item eventKey="0">
                <Accordion.Header >{qa.paragraph3} </Accordion.Header>
                <Accordion.Body >
                {qa.content3}
                </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                  </div>
                  <div className = "notification flex-col font-montserrat gap-2.5 grid items-center max-w-[1265px] mt-[26px] mx-auto md:px-5 w-full">
                <Accordion>
                <Accordion.Item eventKey="0">
                <Accordion.Header >{qa.paragraph4} </Accordion.Header>
                <Accordion.Body >
                {qa.content4}
                </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                  </div>
                  <div className = "notification flex-col font-montserrat gap-2.5 grid items-center max-w-[1265px] mt-[26px] mx-auto md:px-5 w-full">
                <Accordion>
                <Accordion.Item eventKey="0">
                <Accordion.Header >{qa.paragraph5} </Accordion.Header>
                <Accordion.Body >
                {qa.content5}
                </Accordion.Body>
                </Accordion.Item>
                </Accordion>
   </div>
   <div className = "notification flex-col font-montserrat gap-2.5 grid items-center max-w-[1265px] mt-[26px] mx-auto md:px-5 w-full">
             <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header ><span>{qa.paragraph6}</span>
                 </Accordion.Header>
              <Accordion.Body >
              {qa.content6}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
                </div>
              </div>
            </div>
          </div>
          <Footer className="bg-gray_800 flex font-roboto items-center justify-center md:px-5 w-full" />
        </div>
      </div>
  </>

  )
}

export default QandAPage
