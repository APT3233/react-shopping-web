import 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { SitemarkIcon } from './CustomIcons';
import logo from "../../assets/img/logo.png"
import { useNavigate } from 'react-router-dom';

const items = [
  {
    icon: <SettingsSuggestRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Ultimate Performance',
    description:
      'Our products deliver exceptional performance, seamlessly adapting to your needs and elevating your experience.',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Timeless Durability',
    description:
      'Unparalleled craftsmanship ensures lasting durability, making every purchase a worthwhile investment in luxury.',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Sophisticated Experience',
    description:
      'Enjoy an intuitive, seamless interface wrapped in elegant design, crafted for discerning individuals.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Pioneering Innovation',
    description:
      'Stay ahead of the curve with cutting-edge features designed to redefine excellence and exclusivity.',
  },
];


export default function Content() {
  const navigate = useNavigate()
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        {/* <SitemarkIcon /> */}
        <img src={logo} alt='logo' style={{width: "90px", cursor: "pointer"}} onClick={()=>navigate('/')}/>
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
