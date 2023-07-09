import React from 'react';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {CurrenciesScreen} from '../../src/screen/Currencies';

describe('test CurrenciesScreen', () => {
  afterAll(() => jest.restoreAllMocks());

  it('should match snapshot of rendered CurrenciesScreen', () => {
    const {toJSON} = render(
      <NavigationContainer>
        <CurrenciesScreen />
      </NavigationContainer>,
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
