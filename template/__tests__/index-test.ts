import { Log } from '@lomray/microservice-helpers';
import { Microservice } from '@lomray/microservice-nodejs-lib';
import { RemoteMiddlewareClient } from '@lomray/microservice-remote-middleware';
import { expect } from 'chai';
import sinon from 'sinon';
import { microserviceOptions, microserviceParams } from '@config/ms';
import { MS_NAME, MS_CONNECTION } from '@constants/index';
import { start } from '../src';

describe('microservices-name', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  it('should correctly start microservice', async () => {
    const spyCreate = sandbox.spy(Microservice, 'create');
    const registerMethodsStub = sandbox.stub();
    let stubbedStart;
    let isRunBeforeStart = false;
    let addRegisterEndpointSpy;
    let obtainMiddlewares;

    await start({
      msOptions: microserviceOptions,
      msParams: microserviceParams,
      hooks: {
        afterCreateMicroservice: (microservice) => {
          stubbedStart = sandbox.stub(microservice, 'start').resolves();
        },
        afterInitRemoteMiddleware: (remoteMiddleware) => {
          addRegisterEndpointSpy = sandbox.spy(remoteMiddleware, 'addRegisterEndpoint');
          obtainMiddlewares = sandbox.stub(remoteMiddleware, 'obtainMiddlewares').resolves();
        },
        beforeStart: () => {
          isRunBeforeStart = true;
        },
      },
      registerMethods: registerMethodsStub,
    });

    const createOptions = spyCreate.firstCall.firstArg;

    expect(createOptions).to.includes({ name: MS_NAME, connection: MS_CONNECTION });
    expect(stubbedStart).to.calledOnce;
    expect(isRunBeforeStart).to.ok;
    expect(addRegisterEndpointSpy).to.calledOnce;
    expect(obtainMiddlewares).to.calledOnce;
    expect(registerMethodsStub).to.calledOnceWith(Microservice.getInstance());
  });

  it('should correctly start gateway without remote middleware', async () => {
    sandbox.stub(Microservice.getInstance(), 'start').resolves();
    sandbox.stub(RemoteMiddlewareClient, 'instance' as any).value(undefined);

    await start({
      msOptions: microserviceOptions,
      msParams: microserviceParams,
      isDisableRemoteMiddleware: true,
    });

    expect(RemoteMiddlewareClient.getInstance()).to.undefined;
  });

  it('should log error if microservice start failed', async () => {
    const startStub = sandbox.stub(Microservice.getInstance(), 'start').rejects();
    const logSpy = sandbox.spy(Log, 'error');

    await start({
      msOptions: microserviceOptions,
      msParams: microserviceParams,
    });

    logSpy.restore();
    startStub.restore();

    expect(logSpy).to.calledOnce;
  });
});
