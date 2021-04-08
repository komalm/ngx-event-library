export namespace IEventDetailInterface {

        export interface IEventDetail {
                id: string,
                ver: string,
                ts: string,
                params: IRequestStatus,
                responseCode: string,
                result: {
                        content: IEventDetailContent
                }
        }

        export interface IRequestStatus {
                resmsgid: string,
                msgid: string,
                err: string,
                status: string,
                errmsg: string
        }

        export interface IEventDetailContent {
                trackable: {
                        enabled: string,
                        fixedBatch: string,
                        fixedBatchId: string
                },
                identifier: string,
                lastStatusChangedOn: string,
                audience: [],
                code: string,
                visibility: string,
                endDate: string,
                onlineProvider: string,
                language: [],
                eventType: string,
                languageCode: [],
                createdOn: string,
                version: number,
                objectType: string,
                versionKey: string,
                registrationEndDate: string,
                leafNodesCount: number,
                name: string,
                lastUpdatedOn: string,
                startTime: string,
                endTime: string,
                contentType: string,
                startDate: string,
                status: string
        }

}
