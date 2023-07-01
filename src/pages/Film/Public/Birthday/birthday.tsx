/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';

import Header from '../../../../components/MainScreenHeader/mainscreenheader';
import { Text, Img } from '../../../../components/Elements/index';
import OTTFooterhome from '../../../../components/Footer/footer';
import { api } from '../../../../services/api';
import { retriveImageUrls } from '../../../../services/filmservices';
import { LayoutGrid, List } from 'tabler-icons-react'

const BirthdayPage: React.FC = () => {
  const [todayBirthday, setTodayBirthday] = React.useState<any>([])
  const [todayBirthdayMessage, setTodayBirthdayMessage] = React.useState('')
  const [yesterdayBirthdayMessage, setYesterdayBirthdayMessage] = React.useState('')
  const [yesterdayBirthday, setYesterdayBirthday] = React.useState<any>([])
  const [thisWeekBirthday, setThisWeekBirthday] = React.useState<any>([])
  const [thisMonthBirthday, setThisMonthBirthday] = React.useState<any>([])
  useEffect(() => {
    retriveAllBirthdays()
  }, [])

  const retriveAllBirthdays = async () => {
    await retriveYesterdayBirthdays()
    await retriveTodayBirthdays()
    await retriveThisWeekBirthdays()
    await retriveThisMonthBirthdays()
  }

  const handleTodayBirthdayChange = (e) => {
    setTodayBirthdayMessage(e.target.value)
  };
  const handleYesterdayBirthdayChange = (e) => {
    setYesterdayBirthdayMessage(e.target.value)
  };

  const retriveTodayBirthdays = async () => {
    const getAllFilesBasesOnPersonnelInformation: any = []
    const imagesNames: any = []
    const birthdays = await api.get('userprofession/getmoviesbyweekmonthand30days/BirthDay_Today')
    const response = await birthdays.data
    const getImagesFromDb = await retriveAllImages()
    response.forEach(arr1Obj => {
      const matchedObject = getImagesFromDb.find(arr2Obj => arr2Obj.tableId === arr1Obj.id);
      if (matchedObject) {
        getAllFilesBasesOnPersonnelInformation.push(matchedObject);
      }
    })
    getAllFilesBasesOnPersonnelInformation.map(async (item) => {
      imagesNames.push(item.fileName)
    })
    const todayBirthDayImages = await retriveImageUrls(imagesNames)
    setTodayBirthday(todayBirthDayImages)
  }

  const retriveYesterdayBirthdays = async () => {
    const getAllFilesBasesOnPersonnelInformation: any = []
    const imagesNames: any = []
    const birthdays = await api.get('userprofession/getmoviesbyweekmonthand30days/BirthDay_Yesterday')
    const response = await birthdays.data
    const getImagesFromDb = await retriveAllImages()
    response.forEach(arr1Obj => {
      const matchedObject = getImagesFromDb.find(arr2Obj => arr2Obj.tableId === arr1Obj.id);
      if (matchedObject) {
        getAllFilesBasesOnPersonnelInformation.push(matchedObject);
      }
    })
    getAllFilesBasesOnPersonnelInformation.map(async (item) => {
      imagesNames.push(item.fileName)
    })
    const YesterdayBirthdayImages = await retriveImageUrls(imagesNames)
    setYesterdayBirthday(YesterdayBirthdayImages)
  }

  const retriveThisWeekBirthdays = async () => {
    const getAllFilesBasesOnPersonnelInformation: any = []
    const imagesNames: any = []
    const birthdays = await api.get('userprofession/getmoviesbyweekmonthand30days/BirthDay_ThisWeek')
    const response = await birthdays.data
    const getImagesFromDb = await retriveAllImages()
    response.forEach(arr1Obj => {
      const matchedObject = getImagesFromDb.find(arr2Obj => arr2Obj.tableId === arr1Obj.id);
      if (matchedObject) {
        getAllFilesBasesOnPersonnelInformation.push(matchedObject);
      }
    })
    getAllFilesBasesOnPersonnelInformation.map(async (item) => {
      imagesNames.push(item.fileName)
    })
    const thisWeekyBirthDayImages = await retriveImageUrls(imagesNames)
    setThisWeekBirthday(thisWeekyBirthDayImages)
  }

  const retriveThisMonthBirthdays = async () => {
    const getAllFilesBasesOnPersonnelInformation: any = []
    const imagesNames: any = []
    const birthdays = await api.get('userprofession/getmoviesbyweekmonthand30days/BirthDay_ThisMonth')
    const response = await birthdays.data
    const getImagesFromDb = await retriveAllImages()
    response.forEach(arr1Obj => {
      const matchedObject = getImagesFromDb.find(arr2Obj => arr2Obj.tableId === arr1Obj.id);
      if (matchedObject) {
        getAllFilesBasesOnPersonnelInformation.push(matchedObject);
      }
    })
    getAllFilesBasesOnPersonnelInformation.map(async (item) => {
      imagesNames.push(item.fileName)
    })
    const thisMonthBirthDayImages = await retriveImageUrls(imagesNames)
    setThisMonthBirthday(thisMonthBirthDayImages)
  }

  const retriveAllImages = async () => {
    const allFiles = await api.get('/fileupload/getallfilesbyprofessionalinformation')
    const files = allFiles.data
    return files
  }

  const onClickOfImageForTodayBirthday = async (item: any) => {
    let email: string = ''
    const data = item.split('/')
    const datas = await api.get(`fileupload/filename/${data[6]}`)
    const response = datas.data
    const birthdays = await api.get('userprofession/getmoviesbyweekmonthand30days/BirthDay_Today')
    const birthdayresponse = await birthdays.data

    const matchedObject = birthdayresponse.find(arr2Obj => arr2Obj.id === response.tableId);
    matchedObject.userEmail.map((item) => {
      email = item.value
    })
    const birthDayBody = {
      to: email,
      subject: 'Happy Birthday',
      context: todayBirthdayMessage
    }
    await api.post('userprofession/sendmailtocelebrity', birthDayBody)
  }
  const onClickOfImageForYesterdayBirthday = async (item: any) => {
    setYesterdayBirthdayMessage('')
    let email: string = ''
    const data = item.split('/')
    const datas = await api.get(`fileupload/filename/${data[6]}`)
    const response = datas.data
    const birthdays = await api.get('userprofession/getmoviesbyweekmonthand30days/BirthDay_Yesterday')
    const birthdayresponse = await birthdays.data

    const matchedObject = birthdayresponse.find(arr2Obj => arr2Obj.id === response.tableId);
    matchedObject.userEmail.map((item) => {
      email = item.value
    })
    const birthDayBody = {
      to: email,
      subject: 'Happy Birthday',
      context: yesterdayBirthdayMessage
    }
    await api.post('userprofession/sendmailtocelebrity', birthDayBody)
  }

  return (
    <>
      <div className="bg-gray_900 flex flex-col font-roboto items-center justify-start mx-auto w-full">
        <Header className="bg-gray_800 flex flex-row items-center justify-center md:px-5 w-full" />
        <div className="flex font-montserrat items-start mt-[50px] md:px-10 sm:px-5 px-[115px] w-full">
          <Text className="text-amber_A400 text-left w-auto" variant="body6">
            Birthdays
          </Text>
        </div>
         <div className="flex mt-[23px] md:px-10 sm:px-5 px-[119px] w-full">
          <LayoutGrid
              size={30}
              strokeWidth={2}
              className='cursor-pointer mt-0.5 ml-3'
              color={'#FFFFFF'}
            />
            <List
              size={30}
              strokeWidth={2}
              className='cursor-pointer mt-0.5 ml-3'
              color={'#FFFFFF'}
            />
        </div>
        <div className="flex font-montserrat items-start md:px-10 sm:px-5 mt-5 px-[114px] w-full">
          <Text
            className="font-bold text-left text-white_A700 w-auto"
            variant="body26"
          >
            Yesterday{' '}
          </Text>
        </div>
        <div className="font-montserrat sm:h-[1684px] md:h-[316px] h-[342px] max-w-[1288px] mt-3.5 mx-auto md:px-5 relative w-full">
          <div className="absolute flex sm:flex-col flex-row sm:gap-10 inset-x-[0] items-center justify-between mx-auto top-[0] w-full">
          {yesterdayBirthday.map((item:any) => {
            return (
              <>
              <Img key={item}
              src={item}
              className="sm:flex-1 h-[302px] md:h-auto object-cover w-auto sm:w-full"
              alt="imageThirtyThree"
              onClick={() => onClickOfImageForYesterdayBirthday(item)}
            />
            <div className='row-start-2 row-span-2'>
            <input type='text' className='' onChange={handleTodayBirthdayChange}></input>
            </div>
            </>
            )
          })}
          </div>
        </div>
        <div className="flex font-montserrat items-start mt-[41px] md:px-10 sm:px-5 px-[115px] w-full">
          <Text
            className="font-bold text-left text-white_A700 w-auto"
            variant="body26"
          >
            Today
          </Text>
        </div>
        <div className="font-montserrat sm:h-[1580px] h-[355px] md:h-[632px] max-w-[1290px] mt-3.5 mx-auto md:px-5 relative w-full">
          <div className="absolute gap-3.5 grid sm:grid-cols-1 md:grid-cols-3 grid-cols-5 inset-x-[0] items-center justify-between mx-auto top-[0] w-full">
            {todayBirthday.map((item:any) => {
              return (
                <>
                <Img key={item}
                src={item}
                className="flex-1 h-[302px] md:h-auto object-cover rounded w-full"
                alt="rectangle701"
                onClick={() => onClickOfImageForTodayBirthday(item)}
                 />
                <Img
                  src="/images/message.svg"
                  className="flex-1 cursor-pointer absolute sm:ml-56 ml-56 mt-40"
                />
            <div className='row-start-2 row-span-2'>
            <input placeholder = 'send your wishes' type='text' className='md:h-auto sm:w-full sm:flex-1 form-control' onChange={handleTodayBirthdayChange}></input>
            </div>
              </>
              )
            })}
          </div>
        </div>
        <div className="flex font-montserrat items-start mt-[39px] md:px-10 sm:px-5 px-[115px] w-full">
          <Text
            className="font-bold text-left text-white_A700 w-auto"
            variant="body26"
          >
            This Week
          </Text>
        </div>
        <div className="gap-3.5 grid sm:grid-cols-1 md:grid-cols-3 grid-cols-5 items-center justify-start max-w-[1286px] mt-4 mx-auto md:px-5 w-full">
        {thisWeekBirthday.map((item:any) => {
          return (<>
           <Img key={item}
            src={item}
            className="h-[302px] fa fa-envelope-o"
            alt="imageThirtyThree"
          />
          </>
          )
        })}
          </div>
        <div className="flex font-montserrat items-start mt-[39px] md:px-10 sm:px-5 px-[115px] w-full">
          <Text
            className="font-bold text-left text-white_A700 w-auto"
            variant="body26"
          >
            This Month
          </Text>
        </div>
        <div className="flex sm:flex-col flex-row sm:gap-5 items-center justify-start max-w-[1291px] mt-4 mx-auto md:px-5 w-full">
        {thisMonthBirthday.map((item:any) => {
          return (
              <Img key={item}
              src={item}
              className="sm:flex-1 h-[302px] md:h-auto object-cover w-auto sm:w-full"
              alt="imageThirtyThree"
            />
          )
        })}
        </div>
        <OTTFooterhome className="bg-gray_800 flex font-roboto items-center justify-center mt-[123px] md:px-5 w-full" />
      </div>
    </>
  );
};

export default BirthdayPage;
