import React, {Component} from 'react';
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
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
    job: 'Senior Developer, UX/UI, & Project Manager',
    description: <div><p>I'm a foodie, traveller, and techie. A family friend
      introduced me to C++ as a kid, then I discovered modifying the code
      in my favorite videogames. In my teens, somebody I knew was stuck on an
      industrial touchscreen programming project, I made a few too many helpful
      suggestions, and spent the next 8 years as a field service tech and
      software application developer for the industrial world. I still maintain
      a few game mods (mostly in C# or Java), but NodeJS is my go-to language
      when I get the choice.</p>
    </div>,
  }, {
    name: 'Connor Sinnot',
    job: 'Senior Software Architect',
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

    return <Card>
      <CardTitle>
        {developer.name}
      </CardTitle>
      <CardText>{developer.job}</CardText>
      <CardBody>
        {developer.description}
      </CardBody>
    </Card>;
  }
}

class DeveloperCardStack extends Component {

  render() {
    return (
        <div>
          {developerList.map((w, i) => {
            return <DeveloperCard key={'devCard_' + i} developer={w}/>;
          })}
        </div>
    );
  }
}

export default DeveloperCardStack;
