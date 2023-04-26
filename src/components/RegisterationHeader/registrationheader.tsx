import { useNavigate } from 'react-router-dom'
import { MathLower } from 'tabler-icons-react'
import { Text } from '../Elements'
const RegistrationHeader = () => {
  const navigate = useNavigate()
  return (
      <>
      <div className="flex items-center justify-start md:ml-[0] ml-[70px] md:px-5 w-[9%] md:w-full">
              <div className="flex flex-row gap-7 items-center justify-start w-full">
              <MathLower
               size={50}
               strokeWidth={2}
               color={'black'}
               />
                <Text
                  className="font-medium text-black_900"
                  variant="body11"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Text>
              </div>
            </div>
      </>

  )
}

export default RegistrationHeader
