import { Box, Card, Inset, Strong, Text } from "@radix-ui/themes";
import Image from "next/image";
import card from "../../../../public/card.jpeg"

export default function CardBox() {
    return (
        <Box className="flex justify-center w-full ">
            <Card size="2">
                <Inset clip="padding-box" side="top" pb="current">
                    <Image
                        width={200}
                        height={200}
                        src={card}
                        alt="Bold typography"
                        style={{
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: 140,
                            backgroundColor: "var(--gray-5)",
                        }}
                    />
                </Inset>
                <Text as="p" size="3">
                    <Strong>Typography</Strong> is the art and technique of arranging type to
                    make written language legible, readable and appealing when displayed.
                </Text>
            </Card>
        </Box>

    )
}