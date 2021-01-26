import styled from 'styled-components'
import Image from 'next/image'

const QuizLogo = styled.div`
    margin: auto;
    display: grid;

    @media screen and (max-width: 500px) {
        margin: 0;
    }
`

export default function Logo() {
    return (
        <QuizLogo>
            <Image
                src="/soccer-logo.png"
                alt="Logo"
                width={300}
                height={300}
            />
        </QuizLogo>
    )
}
