import React, {Component} from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardSubtitle,
  CardHeader,
  CardLink,
  CardBody, CardDeck,
} from 'reactstrap';

type Developer = {
  name: string,
  job: string,
  description: string,
  url?: Array<string | URL>
}

const developerList: Array<Developer> = [
  {
    name: 'Jefferson Eagley',
    job: ['Founder', 'Senior Software Developer', 'UX/UI', 'Project Manager'],
    url: {linkedin: 'https://www.linkedin.com/in/jefferson-eagley'},
    description: <div>
      <p>I'm a traveller, RC/drone photographer, foodie, and
        techie. I am a software engineer at Microsoft. A family friend
        introduced
        me to C++ as a kid, then I discovered lego robotics and modifying the
        code
        in my favorite videogames. In my teens, I started a SOHO IT business and
        found myself helping people stuck on industrial touchscreen programming
        projects.
      </p>
      <p>I spent the next 8 years as a field service tech and
        software application developer for the industrial world. I still
        maintain
        a few game mods (mostly in C# or Java). I've worked a ton in
        C# (Unity3D/ASP.net) and NodeJS (React/Redux/ThreeJS), with a history of
        several hundred successful projects in the IOT & manufacturing
        space. </p>
    </div>,
  }, {
    name: 'Connor Sinnot',
    job: ['Founder', 'Senior Software Architect', 'AWS manager', 'Devopps'],
    url: {linkedin: 'https://www.linkedin.com/in/connorsinnott'},
    description: <p>I grew up writing adventure games in QBasic and placing them
      on 3.5" floppies to force on my friends. I was exposed to more advanced
      languages later in college after an Android development class. Now its my
      jam! Node.js is my go-to for household chores, but Java holds a special
      place in my heart.</p>,
  }];

export class DeveloperCard extends Component<{
  developer: Developer
}> {
  render() {
    const {developer} = this.props;

    return <React.Fragment>
      <CardHeader>
        <CardTitle>
          {developer.name}
        </CardTitle>
        <CardSubtitle>{developer.job.join(', ')}</CardSubtitle>
      </CardHeader>
      <CardBody>
        {developer.description}
        {/*<CardLink href={developer.url.linkedin}>LinkedIn</CardLink>*/}
      </CardBody>
    </React.Fragment>;
  }
}

class DeveloperCardStack extends Component {

  render() {
    return (
        <Card>
          <CardHeader>
            <CardTitle>Developers</CardTitle>
          </CardHeader>
          {developerList.map((w, i) => {
            return <DeveloperCard key={'devCard_' + i} developer={w}/>;
          })}
        </Card>
    );
  }
}

export default DeveloperCardStack;
