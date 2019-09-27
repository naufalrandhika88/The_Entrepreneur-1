import React from 'react';
import {
  Image,
  StyleSheet,
  StyleProp,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';

// Tabs
import home from '../../assets/images/home.png';
import homeGray from '../../assets/images/homeGray.png';
import transaction from '../../assets/images/transaction.png';
import transactionGray from '../../assets/images/transactionGray.png';
import inbox from '../../assets/images/inbox.png';
import inboxGray from '../../assets/images/inboxGray.png';
import account from '../../assets/images/account.png';
import accountGray from '../../assets/images/accountGray.png';

// Icons
import add from '../../assets/images/add.png';
import minus from '../../assets/images/minus.png';
import arrowBack from '../../assets/images/arrowBack.png';
import qr from '../../assets/images/qr.png';
import qrBig from '../../assets/images/qrBig.png';
import locationWhite from '../../assets/images/locationWhite.png';
import locationBlack from '../../assets/images/locationBlack.png';
import heart from '../../assets/images/heart.png';
import heartGray from '../../assets/images/heartGray.png';
import report from '../../assets/images/report.png';
import share from '../../assets/images/share.png';
import send from '../../assets/images/send.png';
import attachment from '../../assets/images/attachment.png';

// Main Features
import logo from '../../assets/images/logo.png';
import google from '../../assets/images/google.png';
import course from '../../assets/images/course.png';
import mainEvent from '../../assets/images/event.png';
import forum from '../../assets/images/forum.png';
import level from '../../assets/images/level.png';
import membership from '../../assets/images/membership.png';
import upgradeMembership from '../../assets/images/upgradeMembership.png';
import cart from '../../assets/images/cart.png';
import cartGray from '../../assets/images/cartGray.png';

// Images
import eventlogo from '../../assets/images/event.png';
import event1 from '../../assets/images/event1.png';
import event2 from '../../assets/images/event2.png';
import event3 from '../../assets/images/event3.png';
import eventBig from '../../assets/images/eventBig.png';

const ICONS = {
  home: {
    true: home,
    false: homeGray,
  },
  transaction: {
    true: transaction,
    false: transactionGray,
  },
  inbox: {
    true: inbox,
    false: inboxGray,
  },
  account: {
    true: account,
    false: accountGray,
  },
  add: {
    true: add,
    false: add,
  },
  minus: {
    true: minus,
    false: minus,
  },
  arrowBack: {
    true: arrowBack,
    false: arrowBack,
  },
  qr: {
    true: qr,
    false: qrBig,
  },
  location: {
    true: locationWhite,
    false: locationBlack,
  },
  heart: {
    true: heart,
    false: heartGray,
  },
  report: {
    true: report,
    false: report,
  },
  share: {
    true: share,
    false: share,
  },
  send: {
    true: send,
    false: send,
  },
  attachment: {
    true: attachment,
    false: attachment,
  },
  logo: {
    true: logo,
    false: logo,
  },
  google: {
    true: google,
    false: google,
  },
  course: {
    true: course,
    false: course,
  },
  mainEvent: {
    true: mainEvent,
    false: mainEvent,
  },
  forum: {
    true: forum,
    false: forum,
  },
  level: {
    true: level,
    false: level,
  },
  membership: {
    true: membership,
    false: upgradeMembership,
  },
  cart: {
    true: cart,
    false: cartGray,
  },
  event1: {
    true: event1,
    false: event1,
  },
  event2: {
    true: event2,
    false: event2,
  },
  event3: {
    true: event3,
    false: event3,
  },
  eventBig: {
    true: eventBig,
    false: eventBig,
  },
  eventlogo: {
    true: eventlogo,
    false: eventlogo,
  },
};

export type IconName = keyof typeof ICONS;

export let Icons: Record<IconName, IconName> = Object.assign(
  {},
  ...Object.keys(ICONS).map((k) => ({ [k]: k })),
);

type Props = {
  name: IconName;
  isActive: boolean;
  customStyle?: StyleProp<ImageStyle>;
  onPress?: () => void;
};

type BooleanEnum = 'true' | 'false';

export default function Icon(props: Props) {
  let { name, isActive, customStyle, onPress } = props;

  let iconVariation = ICONS[name] as
    | undefined
    | Record<BooleanEnum, number | undefined>;

  if (!iconVariation) {
    return null;
  }

  let source = iconVariation[String(isActive) as BooleanEnum];

  if (source == null) {
    return null;
  }

  if(onPress == null){
    return (
      <Image
      resizeMode="contain"
      resizeMethod="resize"
      fadeDuration={0}
      source={source}
      style={[styles.defaultIcon, customStyle]}
    />
    );
  }else{
    return (
      <TouchableOpacity onPress={onPress}>
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          fadeDuration={0}
          source={source}
          style={[styles.defaultIcon, customStyle]}
        />
      </TouchableOpacity>
    );
  }
}

Icon.defaultProps = {
  isActive: true,
};

const styles = StyleSheet.create({
  defaultIcon: {
    width: 32,
    height: 32,
  },
});
