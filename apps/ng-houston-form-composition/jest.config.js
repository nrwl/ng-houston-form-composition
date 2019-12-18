module.exports = {
  name: 'ng-houston-form-composition',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/ng-houston-form-composition',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
