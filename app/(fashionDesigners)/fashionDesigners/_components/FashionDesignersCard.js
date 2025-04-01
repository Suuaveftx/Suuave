"use client";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Popover,
  PopoverContent,
  PopoverTrigger,
  User,
} from "@heroui/react";
import React from "react";
import { FaBookmark } from "react-icons/fa6";

const UserTwitterCard = ({ idx }) => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-[300px] border-none  bg-transparent" shadow="none">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={`https://i.pravatar.cc/150?img=${idx}`}
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Zoey Lang
            </h4>
            <h5 className="text-small tracking-tight text-default-500">
              @zoeylang
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? "bg-transparent text-foreground border-default-200"
              : null
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="text-small pl-px text-default-500">
          Full-stack developer, @hero_ui lover she/her
          <span aria-label="confetti" role="img">
            🎉
          </span>
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">4</p>
          <p className=" text-default-500 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-600 text-small">97.1K</p>
          <p className="text-default-500 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
};

const FashionDesignersCard = ({
  userName = "Obadea",
  // userAvatarImg = "https://i.pravatar.cc/150?img=9",
  image,
  title = "product title",
  price,
  description,
  productID,
  idx,
}) => {
  // const goToProduct = () => {
  //   const router = useRouter(); // ✅ Add parentheses to call useRouter
  //   if (!productID) return;
  //   router.push(`/fashionDesigners/${productID}`);
  //   console.log("Navigating to:", productID);
  // };

  // const goToProduct = () => {
  //   if (!productID) return;
  //   window.location.href = `/fashionDesigners/${productID}`;
  // };
  const router = useRouter();
  const goToProduct = () => {
    if (!productID) return;
    router.push(`/fashionDesigners/${productID}`);
  };

  return (
    <Card
      isPressable
      className="px-0 hover:shadow-xl"
      onPress={goToProduct}
      shadow="none"
    >
      <CardHeader className="hidden lg:flex">
        <Popover showArrow placement="bottom">
          <PopoverTrigger>
            <User
              avatarProps={{ src: `https://i.pravatar.cc/150?img=${idx}` }}
              name={userName}
              classNames={{ name: "font-semibold" }}
            />
          </PopoverTrigger>
          <PopoverContent className="p-1">
            <UserTwitterCard idx={idx} />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardBody className="overflow-visible p-0">
        <Button
          isIconOnly
          className="absolute right-4 top-4 z-20 border-1 bg-[#444444] border-[#444444]"
          size="sm"
          // onPress={() => {}}
        >
          <FaBookmark className="  fill-[#3A98BB] size-4 " />
        </Button>
        <Image
          alt={title}
          className="w-full object-cover lg:h-[328px] h-[200px] object-top"
          radius="none"
          shadow="sm"
          src={image}
          width="100%"
          // isZoomed
        />
      </CardBody>
      <CardFooter className="flex-col gap-2 items-start">
        <div className="font-semibold flex text-sm w-full justify-between">
          <p className="truncate">{title}</p>
          <p className="hidden lg:block">{price}</p>
        </div>
        <p className="block font-semibold lg:hidden">{price}</p>
        <p className="line-clamp-2-css   text-sm text-[#767676]  text-start">
          {description}
        </p>
        <p className="block text-sm font-medium lg:hidden">{userName}</p>
      </CardFooter>
    </Card>
  );
};

export default FashionDesignersCard;
