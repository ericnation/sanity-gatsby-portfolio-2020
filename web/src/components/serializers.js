import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';
import Figure from './figure';
import Code from './code';

const serializers = {
  types: {
    person: ({ node }) => <span>{node.author.name}</span>,
    figure: Figure,
    code: Code,
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeId(url);
      return <YouTube videoId={id} />;
    },
  },
};

export default serializers;
