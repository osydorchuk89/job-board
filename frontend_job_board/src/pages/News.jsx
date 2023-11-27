import { Container, Stack, Typography } from "@mui/joy";
import { NewsCard } from "../components/NewsCard";

export const News = () => {

    const newsList = [
        {
            title: "Lorem Impsum",
            summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Illum aliquam autem eaque sunt, fuga assumenda dolores quidem at,
        quo deleniti vero delectus adipisci iste sed! Porro quaerat
        culpa cupiditate! Dolorem voluptatum repellat laborum cum officiis
        non nesciunt. Iste, eveniet maxime optio facilis, at adipisci
        expedita, cum sint provident tempore odit. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Aut asperiores numquam ab
        illum facere mollitia libero sint recusandae officia assumenda
        modi debitis optio laborum consequuntur accusantium alias inventore minus,
        explicabo, commodi eum et qui atque. Tempora aspernatur explicabo doloremque alias?`
        },
        {
            title: "Dolor Sit",
            summary: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Consequuntur nihil dolore perferendis similique magni quod
        non aspernatur blanditiis, veritatis alias nisi eveniet soluta
        minus nostrum vel sit quam impedit aliquam numquam, architecto
        ea sed laboriosam! Eligendi eos sequi dolor eius ratione id, alias
        error beatae voluptate. Totam doloremque rerum fuga quis quasi ipsam
        inventore cupiditate! Hic ea error soluta doloribus.`
        },
        {
            title: "Amet Consectetur",
            summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Illum aliquam autem eaque sunt, fuga assumenda dolores quidem at,
            quo deleniti vero delectus adipisci iste sed! Porro quaerat
            culpa cupiditate! Dolorem voluptatum repellat laborum cum officiis
            non nesciunt. Iste, eveniet maxime optio facilis, at adipisci
            expedita, cum sint provident tempore odit. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Aut asperiores numquam ab
            illum facere mollitia libero sint recusandae officia assumenda
            modi debitis optio laborum consequuntur accusantium alias inventore minus,
            explicabo, commodi eum et qui atque. Tempora aspernatur explicabo doloremque alias?`
        },
        {
            title: "Adipisicing Elit",
            summary: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur nihil dolore perferendis similique magni quod
            non aspernatur blanditiis, veritatis alias nisi eveniet soluta
            minus nostrum vel sit quam impedit aliquam numquam, architecto
            ea sed laboriosam! Eligendi eos sequi dolor eius ratione id, alias
            error beatae voluptate. Totam doloremque rerum fuga quis quasi ipsam
            inventore cupiditate! Hic ea error soluta doloribus.`
        },
        {
            title: "Illum Aliquamt",
            summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Illum aliquam autem eaque sunt, fuga assumenda dolores quidem at,
            quo deleniti vero delectus adipisci iste sed! Porro quaerat
            culpa cupiditate! Dolorem voluptatum repellat laborum cum officiis
            non nesciunt. Iste, eveniet maxime optio facilis, at adipisci
            expedita, cum sint provident tempore odit. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Aut asperiores numquam ab
            illum facere mollitia libero sint recusandae officia assumenda
            modi debitis optio laborum consequuntur accusantium alias inventore minus,
            explicabo, commodi eum et qui atque. Tempora aspernatur explicabo doloremque alias?`
        },
    ];

    return (
        <Container sx={{
            paddingY: 5,
        }}>
            <Stack alignItems="center" spacing={3}>
                <Typography level="h3">News</Typography>
                {newsList.map((item, index) => <NewsCard key={index} title={item.title} summary={item.summary} />)}
            </Stack>
        </Container>
    );
};