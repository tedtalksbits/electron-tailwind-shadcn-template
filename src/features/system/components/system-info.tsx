import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React from 'react';
import { cn } from '../../../lib/utils';

interface SystemInfoComponent extends React.ComponentPropsWithoutRef<'div'> {
  systemInfo: Awaited<
    ReturnType<typeof window.ipcRenderer.system.getInfo>
  > | null;
}
export const SystemInfoComponent = ({
  systemInfo,
  className,
  ...props
}: SystemInfoComponent) => {
  if (!systemInfo) {
    return <Skeleton className='w-full h-[400px]' />;
  }

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  return (
    <Card className={cn('w-full max-w-4xl mx-auto', className)} {...props}>
      <CardHeader>
        <CardTitle>System Information</CardTitle>
        <CardDescription>
          Details about your current system environment (Coming from the main
          process)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-1/3'>Property</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className='font-medium'>Node.js Version</TableCell>
              <TableCell>{systemInfo.version}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Architecture</TableCell>
              <TableCell>{systemInfo.arch}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Platform</TableCell>
              <TableCell>{systemInfo.platform}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>CPUs</TableCell>
              <TableCell>
                <div>
                  {systemInfo.cpus.length} x {systemInfo.cpus[0].model}
                </div>
                <div>Speed: {systemInfo.cpus[0].speed} MHz</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Total Memory</TableCell>
              <TableCell>{formatBytes(systemInfo.totalMemory)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Free Memory</TableCell>
              <TableCell>{formatBytes(systemInfo.freeMemory)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Home Directory</TableCell>
              <TableCell>{systemInfo.homeDir}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>OS Type</TableCell>
              <TableCell>{systemInfo.osType}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>OS Release</TableCell>
              <TableCell>{systemInfo.osRelease}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>User Info</TableCell>
              <TableCell>
                <div>Username: {systemInfo.osUserInfo.username}</div>
                <div>UID: {systemInfo.osUserInfo.uid}</div>
                <div>GID: {systemInfo.osUserInfo.gid}</div>
                <div>Shell: {systemInfo.osUserInfo.shell || 'N/A'}</div>
                <div>Home Directory: {systemInfo.osUserInfo.homedir}</div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Hostname</TableCell>
              <TableCell>{systemInfo.osHostname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className='font-medium'>Environment</TableCell>
              <TableCell>{systemInfo.env}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
