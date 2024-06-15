import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ExploreCardItem } from '../exploreCardItem';

describe('Explore card item renders', () => {
  it('renders card component', () => {
    render(<ExploreCardItem name={"Armada"} ticker={'AR'} />);
    expect(screen.getByText('Armada')).toBeVisible();
  });
});
