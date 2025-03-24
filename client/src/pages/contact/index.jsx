import ContactCart from "./Contact"

const teamMembers = [
  {
    name: "APT3233",
    role: "Project Manager / Lead",
    avatar: "https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/474759191_1352131592613340_6298761188258943561_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGW7ko2OAYth_KgUUsfAoMHhHCqt-euvfeEcKq356699xTBnBxIyJd4-udsStvGBGNCw9Db6tyye9UyD5jf2hGs&_nc_ohc=B_lLvTSGd_MQ7kNvgFXT2YG&_nc_oc=Adm-_9z2ZCyVrilEeHJsqElrMQXEIiqha_rK0uJ6KZnZPopkeoybUysjcGkjTtJodpXha65gE6nF7Q8kXvpN9tSQ&_nc_zt=23&_nc_ht=scontent.fsgn2-9.fna&_nc_gid=YSScenpOjCufECfRLWqqIQ&oh=00_AYFFWalpmP5chIC7JIoGo86GCxL_Vg8lef2KIQUPPRPYOw&oe=67E6A3A0",
  },
  {
    name: "Tống Thị Như Quỳnh",
    role: "UI/UX Designer",
    avatar: "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/480316154_638372715818171_5427875343829126918_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHMwdc726wcxexiy8ZZoCJ6gDnGbtqLxc-AOcZu2ovFz_axnzfotH26-C9EIDy_N6uQiy7LH-fTgecjkHmpK4-k&_nc_ohc=KB2FDEtf4RkQ7kNvgGQA9Sd&_nc_oc=Adk-g4gO7DpMRSx0R3ET_2r-sAP73KMJZTxEIYFmAwsFvzpi20R35WRL-qWzEQ_f8TVSuJFrz8R8gBkcopqkP5Lo&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=CaG5SdGQJeRMKV1QNOZJsw&oh=00_AYE9uoHxj6to3_WJbo7lu8eZiI7J1sIdafT3d34A-izPeA&oe=67E6BAF7",
  },
  {
    name: "Nguyễn Văn An",
    role: "Backend Developer",
    avatar: "https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-1/456583742_933897338752172_405888078614854645_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeFSG1N89oT1hOUzWWqE9MSNVAmv12xT-JtUCa_XbFP4m-1KHheOQhxpxIrhD4QYeNIQYEJs0RBuuu6nfjRuSetU&_nc_ohc=V0Gw8uULFJgQ7kNvgHGeL3E&_nc_oc=AdnZNv0OKszlCxPC-G_mtQnmSWQ_jKlpfC8CRmQa3C1nIay9NbZOGgQxo3aIWmNDy6paDxdW_7jLqmKMqcHfT-Mp&_nc_zt=24&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=hXKPC-Wp8xZwIE3AaYxvxw&oh=00_AYGgay7yJf9lzPpFRkK5lhOqhx5tdIh2zqEUX-ANk-BfOQ&oe=67E6A788",
  },
  {
    name: "Nguyễn Văn Nam",
    role: "Frontend Developer",
    avatar: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-1/481961868_1683035122281990_862201489874411597_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=104&ccb=1-7&_nc_sid=1d2534&_nc_eui2=AeGTPIa8iy3K_zDk-LrJyn25haI_6cx-YAqFoj_pzH5gChM8z0sKJ21ulFk1VBz0FEwU6ku-u7xWO2jCReIk74IU&_nc_ohc=f7E-1g7vit4Q7kNvgH1qPfb&_nc_oc=AdlR1SzlkUggNaaSwWyho4Ov66rMHQ9JnxdqdmCF7bmHAYm7MjWqQeNP39TF_izgaUPqPLKWwocONEl5Y57UJ1t9&_nc_zt=24&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=P8o9ctIDl_o9tLftTg8DOQ&oh=00_AYF2J9E_DAeJUSz9S930JDl8fIJijA5esrsKSG6JYnysDA&oe=67E6B247",
  },
  {
    name: "Trần Đức Thắng",
    role: "Backend Developer",
    avatar: "https://scontent.fsgn2-11.fna.fbcdn.net/v/t39.30808-1/476900449_1360919038244226_327932971648938718_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHoL_wU4TGNWlbHLkzkNdi6k61IPZy1mC2TrUg9nLWYLRkKLH-dCQb5Ypz6QSrTmmGiDckC8SfTf2f-hA27GKMc&_nc_ohc=jOwL0DU-zUcQ7kNvgHZ7wgM&_nc_oc=Admi0YAq2cjBYHbdTsbZGOqYQeMZPZADxI16SlkvW632GRrsN9VG0iEu_xAj04SVkSz9Yu4zaHtFAOtCjvaJQ3c8&_nc_zt=24&_nc_ht=scontent.fsgn2-11.fna&_nc_gid=1Rn8sBexjREDEi4HM8XgtQ&oh=00_AYGQa4Zcs0HW8-8ksmoWpyuPeLT0596pI6hectbr-K1qZA&oe=67E6BBE1",
  },
  {
    name: "Hoàng Gia Bảo",
    role: "Quality Assurance",
    avatar: "https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/481981654_1893803204697075_2051024992344842458_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHuYPIHZnKkYvcT5wyFzpX_cvmXCbkxRPNy-ZcJuTFE8166mp4c7ZRiAVrI2iQ0op1DRRcB329xZCuEpEIQu3Ss&_nc_ohc=l3bwgCZA0fAQ7kNvgEnfLnK&_nc_oc=AdmhAgYP2SEMUolu60Pf-4hCJICj7KIZEdVRi_YokPP1_93GWiVQ_u9mPTibgKg-ThsDYinvK7JuTpA1IrwtON5u&_nc_zt=23&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=zoJWJjUZNnlyzh0VFMKK2g&oh=00_AYGP3ekNDbD1UKHHejvYieehRxS0f0WL4vgfewZ2pwPdMQ&oe=67E6AFEF",
  },
];

const Contact = () => {
  return(
    <ContactCart teamMembers={teamMembers} />
  )
}

export default Contact;