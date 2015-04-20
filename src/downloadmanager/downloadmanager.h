#ifndef DOWNLOADMANAGER_H
#define DOWNLOADMANAGER_H

#include <QObject>
#include <QHash>
#include <QStandardPaths>
#include "downloaditem.h"
#include "webviewdownloaditem.h"

class DownloadManager : public QObject
{
    Q_OBJECT

    Q_PROPERTY(qint64 count READ count NOTIFY countChanged)

    public:
        explicit DownloadManager(QObject *parent = 0);
        qint64 count() const;

    signals:
        void countChanged();

    public slots:
        AbstractDownloadItem *downloadItem(int index);
        void createDownloadFromUrl(const QUrl& url);
        void createDownload(QWebDownloadItem* downloaditem);
        void removeCompleted();

    private:
        QList<AbstractDownloadItem*> _downloads;
};

#endif // DOWNLOADMANAGER_H
