This guide is for intel cpu only

In Dell T3620 bios by pressing F10, go to virtualization settings and make sure virtualization and virtualization vt is enabled.

Go to proxmox shell
nano /etc/default/grub

Look for this line:
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
Then change it to look like this:
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"

update-grub

nano /etc/modules
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd


echo "options vfio_iommu_type1 allow_unsafe_interrupts=1" > /etc/modprobe.d/iommu_unsafe_interrupts.conf
echo "options kvm ignore_msrs=1" > /etc/modprobe.d/kvm.conf

echo "blacklist radeon" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf
echo "blacklist nvidia" >> /etc/modprobe.d/blacklist.conf

lspci -v
lspci -n -s 01:00
echo "options vfio-pci ids=10de:0ffa,10de:0e1b disable_vga=1"> /etc/modprobe.d/vfio.conf
update-initramfs -u
reset

Configuring the VM (Windows 10)

Download original iso file from microsoft website: Win10_22H2_English_x64v1.iso
In General Tab
    Create vm
In OS Tab
    ISO image: Win10_22H2_English_x64v1.iso
    Type: Microsoft Windows
    Version: 10/2016/2019
In System Tab
    Machine: q35
    BIOS: OVMF(UEFI)
    EFI Storage: local
    Type Microsoft Windows
In Disks Tab
    Bus Device: SCSI
    Storage: local
    Disk size: 60
In CPU Tab
    Cores: 4
    Type: host
In Memory Tab
    Memory: 6144
In Network Tab
    Model: Virtio

Enable OMVF (UEFI) for the VM

Boot Order: CD-ROM, Disk (scsi0)
SCSI Controller: VirtIO SCSI Single
BIOS: OMVF (UEFI)

nano /etc/pve/qemu-server/100.conf

Replace:
cpu and machine
with
machine: q35
cpu: host,hidden=1,flags=+pcid
args: -cpu 'host,+kvm_pv_unhalt,+kvm_pv_eoi,hv_vendor_id=NV43FIX,kvm=off'

Add PCI Devices (Your GPU) to VM

All Functions: YES
Rom-Bar: YES
Primary GPU: NO
PCI-Express: YES (requires 'machine: q35' in vm config file)

Start Installation
Where do you want to install Windows?
You will face an error and no disks found

Simply go to your VM's Hardware Tab/Window (again), double click the CD-ROM drive file (it should currently have the Windows 10 ISO loaded), and switch the ISO image to the virtio-win-0.1.271.iso file.
Tabbing back to your noVNC Shell window, click Browse, find your newly loaded VirtIO CD-ROM drive, and go to the vioscsi > w10 > amd64 sub-directory. Click OK.

After driver installation switch back to windows 10 iso file then create parition.
After successfully installing windows with limited setup due to network unavailability. Run windows, Go to Manage, load virtio-win-0.1.271.iso and update driver by searching into CD ROM > NetKVM > w10 > amd64

Then enable remote desktop connection. Then make vm display none. Then restart vm and access via remote desktop and update the gpu driver.